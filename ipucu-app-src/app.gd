extends Control

class_name AppController

const SCREENS = {
	"main_menu": "res://screens/menu_screen.tscn",
	"note_editor": "res://screens/note_screen.tscn",
	"settings": "res://screens/settings_screen.tscn"
}

@onready var screen_container: Control = $ScreenContainer
@onready var loading_screen: Control = $LoadingScreen

var current_screen_id: String = ""
var is_loading: bool = false

func _ready() -> void:
	Constants.active_app_controller=self;
	loading_screen.hide()
	set_process(false)
	set_physics_process(false)
	switch_to_screen("main_menu")


var target_data: Dictionary = {}
func switch_to_screen(screen_id: String, data: Dictionary = {}) -> void:
	if not SCREENS.has(screen_id) or is_loading:
		return
	current_screen_id = screen_id
	target_data = data # Store the data payload temporarily
	var target_path = SCREENS[screen_id]
	is_loading = true
	loading_screen.show()
	WorkerThreadPool.add_task(_bg_load_task.bind(target_path))

func _bg_load_task(target_path: String) -> void:
	var loaded_resource = load(target_path)
	if loaded_resource:
		call_deferred("_on_screen_loaded", loaded_resource)
	else:
		call_deferred("_on_load_failed")

func _on_screen_loaded(new_scene_resource: PackedScene) -> void:
	for child in screen_container.get_children():
		child.queue_free()
	var new_screen = new_scene_resource.instantiate()
	if current_screen_id=="note_editor" and not target_data.is_empty() and target_data.has("open_note_name"):
		new_screen.load_note = true;
		new_screen.open_note_name = target_data.open_note_name;
	target_data = {} 
	screen_container.add_child(new_screen)
	loading_screen.hide()
	is_loading = false


func _on_load_failed() -> void:
	print("Error: Background load failed.")
	loading_screen.hide()
	is_loading = false

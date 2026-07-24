extends ScrollContainer
class_name ColController
const card_scn = preload("res://scenes/card.tscn");

@export_range(0,30) var scroll_speed: float = 10.0
var target_scroll: float = 0.0

func _ready() -> void:
	Focus.set_bg_node(self);

func _unhandled_input(event: InputEvent) -> void:
	if Focus.focused_node==null:
		if event.is_action_pressed("add_new"):
			var new_card = card_scn.instantiate();	
			$MarginContainer/HBoxContainer.add_child(new_card);
				
		if event.is_action_pressed("navigate_jump") && Project.cards.size()>0:
			Focus.set_focus(Project.cards[0])
			get_viewport().set_input_as_handled()

func _process(delta: float) -> void:
	# Smoothly slide toward the target every frame
	scroll_horizontal = int(lerp(float(scroll_horizontal), target_scroll, scroll_speed*delta))

func smoothly_scroll_to(node:Control, margin:int):
	print('trying to scroll')
	var current_scroll = scroll_horizontal
	ensure_control_visible(node)
	target_scroll = scroll_horizontal
	scroll_horizontal = current_scroll
	target_scroll += sign(target_scroll - current_scroll) * margin

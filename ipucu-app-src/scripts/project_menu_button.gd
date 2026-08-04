extends MarginContainer

var button_text:String = "null";

func _ready() -> void:
	%Button.text = button_text;


func _on_button_pressed() -> void:
	Constants.active_app_controller.switch_to_screen('note_editor',{"open_note_name":button_text})

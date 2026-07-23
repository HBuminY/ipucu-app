extends ScrollContainer
class_name col_controller
const card_scn = preload("res://scenes/card.tscn");

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

extends ScrollContainer

const card_scn = preload("res://screens/card.tscn");

func _unhandled_input(event: InputEvent) -> void:
	if Focus.focused_node==null:
		if event.is_action_pressed("add_new"):
			var new_card = card_scn.instantiate();	
			$MarginContainer/HBoxContainer.add_child(new_card);
			var ind = Project.create_card("", new_card)
			new_card.card_index = ind;

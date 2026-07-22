extends ScrollContainer

const card_scn = preload("res://scenes/card.tscn");

func _unhandled_input(event: InputEvent) -> void:
	if Focus.focused_node==null:
		if event.is_action_pressed("add_new"):
			var new_card = card_scn.instantiate();	
			$MarginContainer/HBoxContainer.add_child(new_card);
	if event.is_action_pressed("navigate_left") && Project.cards.has(Focus.focused_node):
		var ind = Project.cards.find(Focus.focused_node);
		if ind>0:ind-=1
		else: ind = Project.cards.size()-1
		Focus.set_focus(Project.cards[ind]);
		get_viewport().set_input_as_handled()
	
	if event.is_action_pressed("navigate_right") || event.is_action_pressed("navigate_jump"):
		if Project.cards.has(Focus.focused_node):
			var ind = Project.cards.find(Focus.focused_node);
			if ind<Project.cards.size()-1: ind+=1
			else: ind=0;
			Focus.set_focus(Project.cards[ind]);
			get_viewport().set_input_as_handled()
			
		if event.is_action_pressed("navigate_jump") && Project.cards.size()>0 && Focus.focused_node==null:
			Focus.set_focus(Project.cards[0])
			get_viewport().set_input_as_handled()

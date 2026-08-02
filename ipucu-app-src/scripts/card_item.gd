extends MarginContainer
class_name CardItem

var item_name:String;
var item_checked:bool;
var parent_card:Card;
var is_on_edit:bool;

func _input(event: InputEvent) -> void:
	if Focus.focused_node==self:
		if event.is_action_pressed('navigate_down'):
			var ind = parent_card.card_items.find(self);
			if ind<parent_card.card_items.size()-1: ind+=1
			else: ind=0;
			Focus.set_focus(parent_card.card_items[ind]);
			get_viewport().set_input_as_handled()
				
		if event.is_action_pressed("navigate_up"):
			var ind = parent_card.card_items.find(self);
			if ind>0: ind-=1
			else: ind = parent_card.card_items.size()-1;
			Focus.set_focus(parent_card.card_items[ind]);
			get_viewport().set_input_as_handled()
			
		if event.is_action_pressed("navigate_left"):
			%LineEdit.call_deferred("grab_focus");\
			is_on_edit=true;
			
		if event.is_action_pressed("navigate_right"):
			%Button.call_deferred("grab_focus");
			is_on_edit=true;
		
		if event.is_action_pressed("escape"):
			if is_on_edit:
				is_on_edit=false;
				call_deferred('grab_focus')
			else:
				Focus.set_focus(parent_card);
			get_viewport().set_input_as_handled()
			
		if event.is_action_pressed("enter_selected"):
			if is_on_edit:
				if %LineEdit.has_focus():
					is_on_edit=false;
					call_deferred("grab_focus")
				if %Button.has_focus():
					%Button.button_pressed=!%Button.button_pressed;
			else:
				is_on_edit=true;
				%LineEdit.call_deferred("grab_focus");
			get_viewport().set_input_as_handled()

		if event.is_action_pressed("navigate_jump") && is_on_edit:
			if %LineEdit.has_focus():
				%Button.call_deferred('grab_focus');
			if %Button.has_focus():
				%LineEdit.call_deferred("grab_focus")
			get_viewport().set_input_as_handled()

func get_serialized()->Dictionary:
	return{
		"name":item_name,
		"checked":item_checked
	}

func _on_line_edit_text_changed(new_text: String) -> void:
	item_name=new_text;

func _on_button_toggled(toggled_on: bool) -> void:
	item_checked=toggled_on;

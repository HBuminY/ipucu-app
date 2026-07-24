extends PanelContainer
class_name Card
var card_name: String;
var card_items:Array[CardItem];
const CardItemScn = preload("res://scenes/card_item.tscn")

func _ready() -> void:
	Focus.set_focus(self)
	%Label.text=str(Project.add_card(self))

func get_col_controller() -> ColController:
	var current_parent = self.get_parent()
	while current_parent != null:
		if current_parent is ColController:
			return current_parent
		current_parent = current_parent.get_parent()
	return null


func _unhandled_input(event: InputEvent) -> void:
	if Focus.focused_node==self:
		if event.is_action_pressed("escape"):
			Focus.clear_focus()
			get_viewport().set_input_as_handled()
				
		if event.is_action_pressed("navigate_left"):
			var ind = Project.cards.find(self);
			if ind>0:ind-=1
			else: ind = Project.cards.size()-1
			Focus.set_focus(Project.cards[ind]);
			get_viewport().set_input_as_handled()
		
		if event.is_action_pressed("navigate_right") || event.is_action_pressed("navigate_jump"):
			var ind = Project.cards.find(self);
			if ind<Project.cards.size()-1: ind+=1
			else: ind=0;
			Focus.set_focus(Project.cards[ind]);
			get_viewport().set_input_as_handled()
				
		if event.is_action_pressed("add_new"):
			var new_item:CardItem = CardItemScn.instantiate();
			new_item.parent_card=self;
			$ScrollContainer/VBoxContainer.add_child(new_item);
			card_items.append(new_item);
			$ScrollContainer.set_deferred("scroll_vertical", 9999999)
			get_viewport().set_input_as_handled()
			
		if event.is_action_pressed("navigate_down"):
			if not card_items.is_empty():
				Focus.set_focus(card_items[0])
				get_viewport().set_input_as_handled()
		
		if event.is_action_pressed("navigate_up"):
			if not card_items.is_empty():
				Focus.set_focus(card_items[card_items.size()-1])
				get_viewport().set_input_as_handled()
			
		if event.is_action_pressed("enter_selected"):
			if %LineEdit.has_focus():
				call_deferred('grab_focus')
			else: 
				%LineEdit.call_deferred("grab_focus");
				get_viewport().set_input_as_handled()

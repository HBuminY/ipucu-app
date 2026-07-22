extends PanelContainer
class_name Card
var card_name: String;
var card_items:Array[CardItem];
const CardItemScn = preload("res://scenes/card_item.tscn")

func _ready() -> void:
	Focus.set_focus(self)
	%Label.text=str(Project.add_card(self))

func _unhandled_input(event: InputEvent) -> void:
	if Focus.focused_node==self:
		if event.is_action_pressed("escape"):
			Focus.clear_focus()
				
		if event.is_action_pressed("add_new"):
			var new_item = CardItemScn.instantiate();	
			$ScrollContainer/VBoxContainer.add_child(new_item);
			card_items.append(new_item);
			$ScrollContainer.set_deferred("scroll_vertical", 9999999)
			
		if event.is_action_pressed("navigate_down"):
			if Focus.focused_node==self:
				Focus.set_focus(card_items[0])
			#if card_items.has(Focus.focused_node):
				#var ind = card_items.find(Focus.focused_node);
				#if ind<card_items.size()-1:ind+=1;
				#Focus.set_focus(card_items[ind]);
			
				
		if event.is_action_pressed("navigate_up") && card_items.has(Focus.focused_node):
			var ind = card_items.find(Focus.focused_node);
			if ind<card_items.size()-1:ind+=1;
			Focus.set_focus(card_items[ind]);
			get_viewport().set_input_as_handled()

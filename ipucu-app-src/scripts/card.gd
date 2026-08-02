extends PanelContainer
class_name Card

var manager:CardsManager;
var card_items:Array[CardItem];
var card_name:String='';
const CardItemScn = preload("res://scenes/card_item.tscn")

func _ready() -> void:
	Focus.set_focus(self)
	manager.cards.append(self);

func get_serialized()->Dictionary:
	var serialized_card:Dictionary={
		"name":card_name,
		"items":[]
		};
	for item in card_items:
		serialized_card.cards.assign(item.get_serialized())
	return serialized_card;

func _unhandled_input(event: InputEvent) -> void:
	if Focus.focused_node==self:
		if event.is_action_pressed("escape"):
			Focus.clear_focus()
			get_viewport().set_input_as_handled()
				
		if event.is_action_pressed("navigate_left"):
			var ind = manager.cards.find(self);
			if ind>0:ind-=1
			else: ind = manager.cards.size()-1
			Focus.set_focus(manager.cards[ind]);
			get_viewport().set_input_as_handled()
		
		if event.is_action_pressed("navigate_right") || event.is_action_pressed("navigate_jump"):
			var ind = manager.cards.find(self);
			if ind<manager.cards.size()-1: ind+=1
			else: ind=0;
			Focus.set_focus(manager.cards[ind]);
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
			Focus.set_focus(%LineEdit)
			get_viewport().set_input_as_handled()
	elif Focus.focused_node==%LineEdit:
		if event.is_action_pressed("escape") or event.is_action_pressed("enter_selected"):
			Focus.set_focus(self);
			get_viewport().set_input_as_handled()
		

func _on_line_edit_text_changed(new_text: String) -> void:
	card_name = new_text;

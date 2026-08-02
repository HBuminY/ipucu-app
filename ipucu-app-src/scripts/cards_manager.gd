extends ScrollContainer
class_name CardsManager
const card_scn = preload("res://scenes/card.tscn");

@export_range(0,30) var scroll_speed: float = 10.0
var target_scroll: float = 0.0
var cards: Array[Card] = [];

func _ready() -> void:
	Focus.set_bg_node(self);

func get_serialized()->Dictionary:
	var serialized_cards:Dictionary={
		"cards"=[]
	};
	for card in cards:
		serialized_cards.cards.assign(card.get_serialized());
	return serialized_cards;

func _unhandled_input(event: InputEvent) -> void:
	if Focus.focused_node==null:
		if event.is_action_pressed("add_new"):
			var new_card = card_scn.instantiate();	
			new_card.manager=self;
			$MarginContainer/HBoxContainer.add_child(new_card);
				
		if event.is_action_pressed("navigate_jump") && cards.size()>0:
			Focus.set_focus(cards[0])
			get_viewport().set_input_as_handled()

func _process(delta: float) -> void:
	var next_scroll = lerp(float(scroll_horizontal), float(target_scroll), scroll_speed * delta)
	if abs(next_scroll - target_scroll) < 1.0:
		scroll_horizontal = target_scroll
		set_process(false)
	else:
		scroll_horizontal = int(next_scroll)

func smoothly_scroll_to(node:Control, margin:int):
	set_process(true)
	print('trying to scroll')
	var current_scroll = scroll_horizontal
	ensure_control_visible(node)
	target_scroll = scroll_horizontal
	scroll_horizontal = current_scroll
	target_scroll += sign(target_scroll - current_scroll) * margin

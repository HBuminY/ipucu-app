extends ScrollContainer
class_name CardsManager
const card_scn = preload("res://scenes/card.tscn");

@export_range(0,30) var scroll_speed: float = 10.0
var target_scroll: float = 0.0
var cards: Array[Card] = [];
var note_name:String="test.json";

func _ready() -> void:
	Focus.set_bg_node(self);

func load_from_serialized(open_note_dict:Dictionary):
	for card in open_note_dict.cards:
		var card_instance = add_card(card.name);
		for item in card.items:
			card_instance.add_item(item.name, item.checked)

func get_serialized()->Dictionary:
	var serialized_note:Dictionary={
		"name":note_name,
		"cards":[]
	};
	var serialized_cards:Array[Dictionary] = [];
	for card in cards:
		serialized_cards.append(card.get_serialized())
	serialized_note.cards = serialized_cards;
	return serialized_note;

func add_card(card_name:String='')->Card:
	var new_card = card_scn.instantiate();	
	new_card.manager=self;
	new_card.card_name = card_name;
	$MarginContainer/HBoxContainer.add_child(new_card);
	return new_card;

func _unhandled_input(event: InputEvent) -> void:
	if Focus.focused_node==null:
		if event.is_action_pressed("add_new"):
			add_card()
			trigger_save()
				
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

func trigger_save():
	%Timer.start()
	print('trigger save')

func _on_timer_timeout() -> void:
	print('save logic')
	Storage.save_note(note_name, JSON.stringify(get_serialized()))

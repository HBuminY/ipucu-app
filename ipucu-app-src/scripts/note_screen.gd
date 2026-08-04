extends PanelContainer

const card_scn = preload("res://scenes/card.tscn");
var open_note_name = "";
#wheter the note to display is freshnew or loaded. bypasses load if false
var load_note = false;

#TODO: ADD JSON VALIUDATION TO PREVENT CRASH ON BROKEN SAVE FILES
#func validate_note_data(data: Variant) -> bool:
	#return true

func _ready() -> void:
	if load_note:
		var open_note_dict:Dictionary = Storage.load_note(open_note_name);
		if not open_note_dict.is_empty(): #TODO call json validation here when implemented
			%cards_manager.note_name = open_note_dict.name;
			%cards_manager.load_from_serialized(open_note_dict);
		else:
			print("[ERROR] : Couldn't load a valid note with given note name.")

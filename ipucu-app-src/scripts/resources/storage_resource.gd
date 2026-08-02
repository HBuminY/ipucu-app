class_name StorageRecource
extends Resource

var modified_time: String = ""
var savePath:String =  "user://notes/gdnote.json"
var AllNotes: Array[NoteResource] = [];


func save():
	pass;
	
func load():
	pass;

# Self-saving method to JSON
func save_to_json() -> Error:
	if not DirAccess.dir_exists_absolute("user://notes/"):
		DirAccess.make_dir_absolute("user://notes/")
		
	var file = FileAccess.open(savePath, FileAccess.WRITE)
	if not file:
		return FileAccess.get_open_error()
		
	# Update timestamp right before saving
	modified_time = Time.get_datetime_string_from_system()
	
	var json_string = "";
	file.store_string(json_string)
	file.close()
	return OK

# Static factory method to load a note and return a filled Resource instance
static func load_from_json(from:String, note_id: String) -> NoteResource:
	if not FileAccess.file_exists(from):
		return null
		
	var file = FileAccess.open(from, FileAccess.READ)
	var json_string = file.get_as_text()
	file.close()
	
	var json = JSON.new()
	if json.parse(json_string) == OK:
		var new_note = NoteResource.new()
		new_note.from_dict(json.data)
		return new_note
		
	return null

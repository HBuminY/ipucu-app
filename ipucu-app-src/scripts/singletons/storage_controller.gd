extends Node

func get_save_folder() -> String:
	var docs_path = OS.get_system_dir(OS.SYSTEM_DIR_DOCUMENTS)
	var app_folder = docs_path.path_join(Constants.save_folder_name)	
	if not DirAccess.dir_exists_absolute(app_folder):
		DirAccess.make_dir_recursive_absolute(app_folder)
	return app_folder
	
func get_save_path(file_name: String) -> String:
	return get_save_folder().path_join(file_name)

func save_note(note_name: String, serialized_note: String) -> Error:
	var full_path = get_save_path(note_name.uri_encode())
	var file = FileAccess.open(full_path, FileAccess.WRITE)
	if not file:
		return FileAccess.get_open_error()
	file.store_string(serialized_note)
	file.close()
	return Error.OK

func load_note(note_name: String) -> Dictionary:
	var full_path = get_save_path(note_name.uri_encode())
	if not FileAccess.file_exists(full_path):
		print("Warning: Note file does not exist: ", note_name)
		return {}
		
	var file = FileAccess.open(full_path, FileAccess.READ)
	if not file:
		print("Error opening file for reading: ", FileAccess.get_open_error())
		return {}
		
	var content = file.get_as_text()
	file.close()
	return JSON.parse_string(content);

func list_all_notes() -> Array[String]:
	var note_files: Array[String] = []
	var folder_path = get_save_folder()
	
	var dir = DirAccess.open(folder_path)
	if dir:
		dir.list_dir_begin()
		var file_name = dir.get_next()
		while file_name != "":
			if not dir.current_is_dir() and not file_name.begins_with(".") and file_name.ends_with('.json'):
				note_files.append(file_name.uri_decode());
			file_name = dir.get_next()
		dir.list_dir_end()
	else:
		print("Error accessing save directory.")	
	return note_files

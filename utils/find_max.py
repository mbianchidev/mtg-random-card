import json

def find_min_max_ids(file_path):
    try:
        # Load JSON data from the file
        with open(file_path, 'r') as file:
            data = json.load(file)
        
        # Extract IDs from the JSON objects
        ids = [item['id'] for item in data if 'id' in item]
        
        # Find minimum and maximum IDs
        min_id = min(ids)
        max_id = max(ids)
        
        return min_id, max_id
    
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
    except json.JSONDecodeError:
        print(f"Error: File '{file_path}' does not contain valid JSON.")
    except ValueError:
        print("Error: No IDs found in the JSON data.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# File path to the JSON file
file_path = 'data.json'

# Find and print the minimum and maximum IDs
result = find_min_max_ids(file_path)
if result:
    print(f"Minimum ID: {result[0]}")
    print(f"Maximum ID: {result[1]}")
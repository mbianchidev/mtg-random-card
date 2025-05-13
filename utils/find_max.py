import json
import sys

def find_min_max_multiverse_ids(file_path):
    try:
        print(f"Opening file: {file_path}")
        print("This may take a moment if the file is large...")
        
        # Load JSON data from the file
        with open(file_path, 'r') as file:
            data = json.load(file)
            
        print(f"Successfully loaded JSON data. Top level type: {type(data)}")
        
        # Print complete data structure for better understanding
        print("\n===== JSON STRUCTURE =====")
        if isinstance(data, list) and len(data) > 0:
            print(f"Data is a list with {len(data)} items.")
            print("\n===== COMPLETE FIRST ITEM =====")
            print(json.dumps(data[0], indent=2))
            
        elif isinstance(data, dict):
            print(f"Data is a dictionary with {len(data.keys())} keys.")
            print("Top-level keys:", list(data.keys()))
            
            # If it has 'meta' and 'data' sections, print both completely
            if 'meta' in data and 'data' in data:
                print("\n===== META SECTION =====")
                print(json.dumps(data['meta'], indent=2))
                
                print("\n===== FIRST DATA ENTRY =====")
                if isinstance(data['data'], list) and len(data['data']) > 0:
                    print(json.dumps(data['data'][0], indent=2))
                elif isinstance(data['data'], dict) and len(data['data']) > 0:
                    first_key = next(iter(data['data']))
                    print(f"First data key: {first_key}")
                    print(json.dumps(data['data'][first_key], indent=2))
            
            # If it's a nested structure with set codes
            else:
                first_key = next(iter(data))
                print(f"\n===== SAMPLE SET: '{first_key}' =====")
                if isinstance(data[first_key], dict):
                    if 'cards' in data[first_key] and isinstance(data[first_key]['cards'], list) and len(data[first_key]['cards']) > 0:
                        print("\n===== FIRST CARD IN SET =====")
                        print(json.dumps(data[first_key]['cards'][0], indent=2))
                        
                        # Check if the card has identifiers and multiverseId to show as example
                        sample_card = data[first_key]['cards'][0]
                        if 'identifiers' in sample_card and 'multiverseId' in sample_card['identifiers']:
                            print("\n===== SAMPLE MULTIVERSE ID =====")
                            print(f"multiverseId: {sample_card['identifiers']['multiverseId']}")
                    else:
                        print(f"Keys in set: {list(data[first_key].keys())}")
                        for key in data[first_key].keys():
                            if isinstance(data[first_key][key], list) and len(data[first_key][key]) > 0:
                                print(f"\n===== FIRST ITEM IN '{key}' =====")
                                print(json.dumps(data[first_key][key][0], indent=2))
                                break
                else:
                    print(json.dumps(data[first_key], indent=2))
        
        # Initialize an empty list to store all collected multiverse IDs
        all_multiverse_ids = []
        
        print("\n===== EXTRACTING MULTIVERSE IDs =====")
        
        # Strategy 1: Check if data is a list of objects with 'identifiers.multiverseId'
        if isinstance(data, list):
            for item in data:
                if isinstance(item, dict) and 'identifiers' in item and 'multiverseId' in item['identifiers']:
                    try:
                        multiverse_id = int(item['identifiers']['multiverseId'])
                        all_multiverse_ids.append(multiverse_id)
                    except (ValueError, TypeError):
                        # Skip if not a valid integer
                        pass
            print(f"Found {len(all_multiverse_ids)} multiverse IDs in direct list items")
            
        # Strategy 2: Check if data is a dictionary with 'data' field
        elif isinstance(data, dict) and 'data' in data:
            if isinstance(data['data'], list):
                for item in data['data']:
                    if isinstance(item, dict) and 'identifiers' in item and 'multiverseId' in item['identifiers']:
                        try:
                            multiverse_id = int(item['identifiers']['multiverseId'])
                            all_multiverse_ids.append(multiverse_id)
                        except (ValueError, TypeError):
                            pass
            elif isinstance(data['data'], dict):
                for key, item in data['data'].items():
                    if isinstance(item, dict) and 'identifiers' in item and 'multiverseId' in item['identifiers']:
                        try:
                            multiverse_id = int(item['identifiers']['multiverseId'])
                            all_multiverse_ids.append(multiverse_id)
                        except (ValueError, TypeError):
                            pass
            print(f"Found {len(all_multiverse_ids)} multiverse IDs in data section")
            
        # Strategy 3: Check for nested structure (MTG JSON format with sets)
        elif isinstance(data, dict):
            # Check for cards in each set
            card_count = 0
            multiverse_id_count = 0
            for set_code, set_data in data.items():
                if isinstance(set_data, dict) and 'cards' in set_data and isinstance(set_data['cards'], list):
                    for card in set_data['cards']:
                        card_count += 1
                        if isinstance(card, dict) and 'identifiers' in card and 'multiverseId' in card['identifiers']:
                            try:
                                multiverse_id = int(card['identifiers']['multiverseId'])
                                all_multiverse_ids.append(multiverse_id)
                                multiverse_id_count += 1
                            except (ValueError, TypeError):
                                # Skip if not a valid integer
                                pass
            
            print(f"Found {len(all_multiverse_ids)} multiverse IDs in {card_count} cards across sets")
            print(f"Cards with multiverse IDs: {multiverse_id_count} ({(multiverse_id_count/card_count)*100:.2f}% of total)")
        
        # If no multiverse IDs found yet, try a deep search approach
        if not all_multiverse_ids:
            print("No multiverse IDs found in expected locations. Performing deep search...")
            
            def extract_multiverse_ids_recursive(obj, path=""):
                ids = []
                if isinstance(obj, dict):
                    # Check if this is an identifiers object with multiverseId
                    if 'identifiers' in obj and isinstance(obj['identifiers'], dict) and 'multiverseId' in obj['identifiers']:
                        try:
                            multiverse_id = int(obj['identifiers']['multiverseId'])
                            ids.append((multiverse_id, f"{path}.identifiers.multiverseId"))
                        except (ValueError, TypeError):
                            pass
                    # If we're in the identifiers object directly
                    elif 'multiverseId' in obj:
                        try:
                            multiverse_id = int(obj['multiverseId'])
                            ids.append((multiverse_id, f"{path}.multiverseId"))
                        except (ValueError, TypeError):
                            pass
                    
                    # Continue searching recursively
                    for key, value in obj.items():
                        ids.extend(extract_multiverse_ids_recursive(value, f"{path}.{key}" if path else key))
                elif isinstance(obj, list):
                    for i, item in enumerate(obj):
                        ids.extend(extract_multiverse_ids_recursive(item, f"{path}[{i}]" if path else f"[{i}]"))
                return ids
            
            all_multiverse_id_paths = extract_multiverse_ids_recursive(data)
            if all_multiverse_id_paths:
                print(f"Found {len(all_multiverse_id_paths)} multiverse IDs in deep search")
                print("Sample multiverse ID locations:")
                for i, (id_val, path) in enumerate(all_multiverse_id_paths[:5]):
                    print(f"  {id_val} at {path}")
                if len(all_multiverse_id_paths) > 5:
                    print(f"  ... and {len(all_multiverse_id_paths) - 5} more")
                
                all_multiverse_ids = [id_val for id_val, _ in all_multiverse_id_paths]
        
        # Check if we found any multiverse IDs
        if not all_multiverse_ids:
            raise ValueError("No multiverse IDs found in the JSON data.")
            
        # Find minimum and maximum multiverse IDs
        min_id = min(all_multiverse_ids)
        max_id = max(all_multiverse_ids)
        
        print(f"Successfully extracted {len(all_multiverse_ids)} multiverse IDs")
        
        return min_id, max_id
    
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return None
    except json.JSONDecodeError:
        print(f"Error: File '{file_path}' does not contain valid JSON.")
        return None
    except KeyError as e:
        print(f"Error: Could not process the JSON structure: {e}")
        print("JSON structure may be different than expected.")
        return None
    except ValueError:
        print("Error: No multiverseIds found in the JSON data.")
        return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None

def main():
    # Check if file path is provided as argument
    if len(sys.argv) < 2:
        print("Usage: python find_max.py <file_path>")
        print("Example: python find_max.py ../resources/AllPrintings-mtg.json")
        sys.exit(1)
    
    # Get file path from command line argument
    file_path = sys.argv[1]
    
    print(f"Starting analysis of: {file_path}")
    
    # Find and print the minimum and maximum multiverse IDs
    print("\n===== ANALYZING JSON STRUCTURE AND MULTIVERSE IDs =====")
    result = find_min_max_multiverse_ids(file_path)
    if result:
        print(f"\n===== RESULTS =====")
        print(f"Minimum multiverseId: {result[0]}")
        print(f"Maximum multiverseId: {result[1]}")
    else:
        print("\n===== NO VALID RESULTS =====")
        print("Could not determine min/max multiverse IDs. See errors above.")

if __name__ == "__main__":
    main()
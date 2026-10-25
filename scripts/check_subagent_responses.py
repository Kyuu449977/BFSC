import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('C:/Users/phamp/.gemini/antigravity/brain/6248ef8e-086a-489b-bbec-839a53c5dd9e/.system_generated/logs/transcript.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        if data.get('source') == 'SUBAGENT' or 'b4f28147' in str(data) or '5e0c4be4' in str(data):
            content = str(data.get('content', ''))[:200]
            print(data.get('step_index'), content)

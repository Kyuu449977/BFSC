import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('C:/Users/phamp/.gemini/antigravity/brain/6248ef8e-086a-489b-bbec-839a53c5dd9e/.system_generated/logs/transcript.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        calls = data.get('tool_calls', [])
        for c in calls:
            if c.get('name') == 'invoke_subagent':
                print(c.get('args'))

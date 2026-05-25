import os

def fix_files():
    src_dir = '/Users/anandnair/Machinga Website Antigravity/src'
    target_str = "${process.env.NODE_ENV === 'production' ? '/machinga-nextjs' : ''}"
    
    # Process files in src/
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                if target_str in content:
                    print(f"Fixing paths in: {filepath}")
                    new_content = content.replace(target_str, '')
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)

    # Process next.config.ts
    config_path = '/Users/anandnair/Machinga Website Antigravity/next.config.ts'
    if os.path.exists(config_path):
        with open(config_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        target_config = "basePath: isProd ? '/machinga-nextjs' : '',"
        if target_config in content:
            print(f"Fixing config in: {config_path}")
            new_content = content.replace(target_config, "basePath: '',")
            with open(config_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

if __name__ == '__main__':
    fix_files()

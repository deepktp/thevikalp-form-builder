use std::env;
use std::fs;
use std::path::Path;
use std::process;

//main fn
fn main() {
    //vector of strings
    //collecting args from command line
    let args: Vec<String> = env::args().collect();
    //if less than 2 args, print error and exit
    if args.len() < 2 {
        eprintln!("❌ Error: Please provide a field name");
        eprintln!("Usage: {} <FieldName>", args[0]);
        eprintln!("Example: {} MyCustomField", args[0]);
        process::exit(1);
    }

    //getting index 1 arg as field name
    let field_name = &args[1]; //shared reference

    // Convert to PascalCase
    let pascal_case_name = to_pascal_case(field_name); //calling custom function that converts to pascal case
    if !is_valid_pascal_case(&pascal_case_name) {
        //checking if the name is valid pascal case
        eprintln!(
            "❌ Error: Field name must be in PascalCase (e.g., MyCustomField)"
        );
        process::exit(1);
    }

    // Convert to kebab-case
    let _kebab_case_name = to_kebab_case(&pascal_case_name); //calling custom function that converts to kebab case

    // new path object
    let base_dir = Path::new("formily/antd/src");
    // new destination path to components/FieldName
    let component_path = base_dir.join("components").join(&pascal_case_name);
    //new destination path to schemas
    let schema_path = base_dir.join("schemas");

    println!("🚀 Creating field template for: {}", pascal_case_name);

    // Create component directory
    //create all directories if they don't exist
    //if error, print and exit
    if let Err(e) = fs::create_dir_all(&component_path) {
        eprintln!("❌ Error creating directory: {}", e);
        process::exit(1);
    }

    // Generate component files
    //vector of tuples of file name and content
    let files = vec![
        ("index.ts", format!("export * from './preview';\n")),
        ("preview.tsx", generate_preview_content(&pascal_case_name))
    ];

    for (file_name, content) in files {
        let file_path = component_path.join(file_name);
        if let Err(e) = fs::write(&file_path, content) {
            eprintln!("❌ Error writing file {}: {}", file_path.display(), e);
            process::exit(1);
        }
        println!("✅ Created: {}", file_path.display());
    }

    // Create schema file
    let schema_file_path = schema_path.join(format!("{}.ts", pascal_case_name));
    let schema_content = generate_schema_content(&pascal_case_name);
    if let Err(e) = fs::write(&schema_file_path, schema_content) {
        eprintln!("❌ Error writing schema file: {}", e);
        process::exit(1);
    }
    println!("✅ Created: {}", schema_file_path.display());

    // Update components index.ts
    update_index_file(
        &base_dir.join("components/index.ts"),
        &format!("export * from './{}';", pascal_case_name)
    );

    // Update schemas all.ts
    update_index_file(
        &schema_path.join("all.ts"),
        &format!("export * from './{}';", pascal_case_name)
    );

    // Create locale file
    let locales_dir = base_dir.join("locales");
    let locale_file_path = locales_dir.join(format!("{}.ts", pascal_case_name));
    let locale_content = generate_locale_content(&pascal_case_name);
    if let Err(e) = fs::write(&locale_file_path, locale_content) {
        eprintln!("❌ Error writing locale file: {}", e);
        process::exit(1);
    }
    println!("✅ Created: {}", locale_file_path.display());

    // Update locales all.ts
    update_index_file(
        &locales_dir.join("all.ts"),
        &format!("export * from './{}';", pascal_case_name)
    );

    println!("\n🎉 Field template created successfully!");
    println!("\n📝 Next steps:");
    println!("1. Edit the generated files in: formily/antd/src/components/{}/", pascal_case_name);
    println!("2. Customize the schema in: formily/antd/src/schemas/{}.ts", pascal_case_name);
    println!("3. Update locales in: formily/antd/src/locales/");
    println!("4. Build the project: yarn build");
    println!("5. Test in the example: yarn example:basic");
    println!(
        "\n💡 The field will appear in the \"Basic Fields\" section of the designer."
    );
}

fn to_pascal_case(s: &str) -> String {
    s.split('-')
        .map(|word| {
            let mut chars = word.chars();
            match chars.next() {
                None => String::new(),
                Some(first) =>
                    first.to_uppercase().collect::<String>() +
                        chars.as_str().to_lowercase().as_str(),
            }
        })
        .collect()
}

fn to_kebab_case(s: &str) -> String {
    let mut result = String::new();
    for (i, ch) in s.char_indices() {
        if ch.is_uppercase() && i > 0 {
            result.push('-');
        }
        result.push(ch.to_lowercase().next().unwrap());
    }
    result
}

fn is_valid_pascal_case(s: &str) -> bool {
    if s.is_empty() {
        return false;
    }
    let chars: Vec<char> = s.chars().collect();
    if !chars[0].is_uppercase() {
        return false;
    }
    for &ch in &chars[1..] {
        if !ch.is_alphanumeric() {
            return false;
        }
    }
    true
}

fn generate_preview_content(pascal_case_name: &str) -> String {
    format!(
        "import React from 'react';
import {{ Input as FormilyInput }} from '@formily/antd-v5';
import {{ createBehavior, createResource }} from '@thevikalp/designable-core';
import {{ DnFC }} from '@thevikalp/designable-react';
import {{ createFieldSchema }} from '../Field';
import {{ AllSchemas }} from '../../schemas';
import {{ AllLocales }} from '../../locales';

export const {}: DnFC<React.ComponentProps<typeof FormilyInput>> = FormilyInput;

{}.Behavior = createBehavior({{
  name: '{}',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === '{}',
  designerProps: {{
    propsSchema: createFieldSchema(AllSchemas.{}),
  }},
  designerLocales: AllLocales.{},
}});

{}.Resource = createResource({{
  icon: '{}Source',
  elements: [
    {{
      componentName: 'Field',
      props: {{
        type: 'string',
        title: '{}',
        'x-decorator': 'FormItem',
        'x-component': '{}',
      }},
    }},
  ],
}});
",
        pascal_case_name,
        pascal_case_name,
        pascal_case_name,
        pascal_case_name,
        pascal_case_name,
        pascal_case_name,
        pascal_case_name,
        pascal_case_name,
        pascal_case_name,
        pascal_case_name
    )
}

fn generate_schema_content(pascal_case_name: &str) -> String {
    format!("import {{ ISchema }} from '@formily/react';

export const {}: ISchema = {{
  type: 'object',
  properties: {{
    placeholder: {{
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {{
        placeholder: 'Enter placeholder text',
      }},
    }},
    maxLength: {{
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {{
        placeholder: 'Maximum length',
      }},
    }},
    required: {{
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {{
        defaultChecked: false,
      }},
    }},
  }},
}};
", pascal_case_name)
}

fn generate_locale_content(pascal_case_name: &str) -> String {
    format!(
        "export const {} = {{
  'zh-CN': {{
    title: '{}',
    settings: {{
      'x-component-props': {{
        placeholder: '占位提示',
        maxLength: '最大长度',
      }},
    }},
  }},
  'en-US': {{
    title: '{}',
    settings: {{
      'x-component-props': {{
        placeholder: 'Placeholder',
        maxLength: 'Max Length',
      }},
    }},
  }},
  'ko-KR': {{
    title: '{}',
    settings: {{
      'x-component-props': {{
        placeholder: '플레이스홀더',
        maxLength: '최대 길이',
      }},
    }},
  }},
}};
",
        pascal_case_name,
        pascal_case_name,
        pascal_case_name,
        pascal_case_name
    )
}

fn update_index_file(index_path: &Path, export_line: &str) {
    let mut content = match fs::read_to_string(index_path) {
        Ok(c) => c,
        Err(e) => {
            eprintln!("❌ Error reading {}: {}", index_path.display(), e);
            return;
        }
    };

    if !content.contains(export_line) {
        content.push_str(&format!("\n{}", export_line));
        if let Err(e) = fs::write(index_path, content) {
            eprintln!("❌ Error writing {}: {}", index_path.display(), e);
            return;
        }
        println!("✅ Updated: {}", index_path.display());
    }
}

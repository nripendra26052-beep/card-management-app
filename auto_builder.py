import os
import sys
from openai import OpenAI

def run_auto_builder():
    print("🚀 Starting Autonomous Self-Healing Build Loop...")

    # 1. Check for API token presence
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("❌ ERROR: Missing OPENAI_API_KEY environment variable in runtime vault.")
        sys.exit(1)

    # Initialize OpenAI client
    client = OpenAI(api_key=api_key)

    # 2. Establish strict project file path destinations
    prd_path = "docs/PRD.md"
    app_path = "src/App.jsx"

    if not os.path.exists(prd_path):
        print(f"❌ ERROR: Requirements document missing at target path: {prd_path}")
        sys.exit(1)
        
    if not os.path.exists(app_path):
        print(f"❌ ERROR: Target source application file missing at: {app_path}")
        sys.exit(1)

    # 3. Read the inputs explicitly
    print("📖 Reading PRD requirements and existing source code...")
    with open(prd_path, "r", encoding="utf-8") as f:
        prd_content = f.read()

    with open(app_path, "r", encoding="utf-8") as f:
        current_app_code = f.read()

    # 4. Construct an absolute, explicit prompt envelope
    system_prompt = (
        "You are an expert full-stack engineer automating a React + Tailwind CSS v4 codebase. "
        "Your sole task is to update the provided source code to perfectly match the provided PRD rules. "
        "You must output the complete, updated file content. Do not include markdown code block wrappers (like ```jsx), "
        "do not include explanations, and do not truncate the code. Return ONLY the raw, executable code."
    )

    user_prompt = f"""
    Here is the Product Requirement Document (PRD):
    ---
    {prd_content}
    ---

    Here is the CURRENT source code for '{app_path}':
    ---
    {current_app_code}
    ---

    Please rewrite this code to strictly satisfy all rules in the PRD. Ensure updated data limits (e.g., $75,000) and design/theme layout values (e.g., indigo gradients) are fully implemented.
    """

    # 5. Execute API call wrapped in robust exception guardrails
    print("🤖 Communicating with OpenAI API layer...")
    try:
        response = client.chat.completions.create(
            model="gpt-4o", # Using a highly reliable model for code generation
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.1 # Low temperature ensures strict compliance, minimizing creative drift
        )
        
        updated_code = response.choices[0].message.content.strip()

        # 6. Safety check: Ensure the response isn't corrupted or empty
        if not updated_code or len(updated_code) < 100:
            raise ValueError("The AI returned an empty or severely truncated code string.")

        # Clean up accidental markdown backticks if the LLM slipped up
        if updated_code.startswith("```"):
            updated_code = "\n".join(updated_code.split("\n")[1:-1])

        # 7. Atomically write the self-healed code back to disk
        print(f"💾 Writing updated self-healed code directly into {app_path}...")
        with open(app_path, "w", encoding="utf-8") as f:
            f.write(updated_code)
            
        print("✅ Success! Application code synchronized with PRD requirements seamlessly.")

    except Exception as e:
        print(f"❌ PIPELINE EXECUTION CRASHED: Detailed Exception Log:")
        print("-" * 60)
        import traceback
        traceback.print_exc()
        print("-" * 60)
        sys.exit(1) # Tell GitHub Actions that the step explicitly failed

if __name__ == "__main__":
    run_auto_builder()
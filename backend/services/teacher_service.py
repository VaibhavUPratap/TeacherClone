from config import supabase

SUBJECTS = [
    {"id": "math", "name": "Mathematics", "icon": "Binary", "description": "Calculus, Algebra, and Statistics", "enrolled_count": 150},
    {"id": "physics", "name": "Physics", "icon": "Atom", "description": "Mechanics, Optics, and Thermodynamics", "enrolled_count": 120},
    {"id": "chem", "name": "Chemistry", "icon": "Beaker", "description": "Organic, Inorganic and Physical Chemistry", "enrolled_count": 95},
    {"id": "prog", "name": "Programming", "icon": "Code", "description": "Python, Java, C, and Systems Programming", "enrolled_count": 200},
    {"id": "ml", "name": "Machine Learning", "icon": "Brain", "description": "Neural Networks, Data Science, and AI", "enrolled_count": 80},
    {"id": "ds", "name": "Data Structures & Algorithms", "icon": "Binary", "description": "Arrays, Lists, Trees, Graphs, and Algorithm Design", "enrolled_count": 110},
    {"id": "llm", "name": "Large Language Models", "icon": "Sparkles", "description": "Transformers, Attention, Fine-tuning, and Prompting", "enrolled_count": 65},
    {"id": "mech", "name": "Engineering Mechanics", "icon": "Beaker", "description": "Statics and Dynamics for Engineers", "enrolled_count": 75},
]

# Mock resources for each subject
RESOURCES = {
    "math": [
        {"id": "m1", "title": "Integration Techniques", "type": "Lecture PDF", "description": "Detailed notes on substitution and integration by parts.", "content": "Integration is a fundamental concept in calculus..."},
        {"id": "m2", "title": "Formula Sheet: Calculus", "type": "Formula Sheet", "description": "All essential derivative and integral formulas.", "content": "d/dx(sin x) = cos x..."},
        {"id": "m3", "title": "Laplace Transform Notes", "type": "Class Notes", "description": "Step-by-step derivation of Laplace transforms.", "content": "The Laplace transform is an integral transform..."},
        {"id": "m4", "title": "Previous Year Paper - 2024", "type": "Previous Year Paper", "description": "Standard exam paper for practice.", "content": "Question 1: Evaluate the integral..."},
    ],
    "physics": [
        {"id": "p1", "title": "Quantum Mechanics Intro", "type": "Presentation Slides", "description": "Visual introduction to wave-particle duality.", "content": "Quantum mechanics describes the physical properties of nature at the scale of atoms..."},
        {"id": "p2", "title": "Electromagnetism Summary", "type": "Concept Summaries", "description": "Quick revision of Maxwell's equations.", "content": "Maxwell's equations are a set of coupled partial differential equations..."},
        {"id": "p3", "title": "Newtonian Dynamics", "type": "Lecture PDF", "description": "Focus on 3rd law and momentum.", "content": "Newton's third law states that for every action, there is an equal and opposite reaction..."},
    ],
    "chem": [
        {"id": "c1", "title": "Organic Reactions", "type": "Revision Notes", "description": "Summary of SN1 and SN2 mechanisms.", "content": "The SN1 reaction is a substitution reaction in organic chemistry..."},
    ],
    "prog": [
        {"id": "pr1", "title": "Python Basics", "type": "Practice Problems", "description": "Basic loops and conditional statements.", "content": "Problem 1: Write a function to check if a number is prime..."},
    ]
}

TEACHER_CLONES = [
    # ── Original Math teachers ────────────────────────────────────────────────
    {
        "id": "dr-rao",
        "name": "Dr. Rao",
        "subject_id": "math",
        "teaching_style": "Conceptual & Analytical",
        "description": "Focuses on fundamental concepts with deep analytical derivations. Prefers step-by-step logic.",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=rao",
        "personality_prompt": "You are Dr. Rao, a senior Mathematics professor. Your teaching style is conceptual and analytical. You explain concepts with deep mathematical rigor but always connect it back to intuition. You are patient, formal, and encourage students to think about 'Why' rather than just 'How'. Use professional yet encouraging tone.",
        "voice_id": "dr-rao"
    },
    {
        "id": "prof-sharma",
        "name": "Prof. Sharma",
        "subject_id": "math",
        "teaching_style": "Numerical-Driven",
        "description": "Expert in problem-solving. Uses real-world numerical examples to teach complex laws.",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=sharma",
        "personality_prompt": "You are Prof. Sharma, an expert Mathematics teacher who believes in learning through practice. You dive straight into numerical problems. Your explanations are concise and focused on problem-solving techniques. You are energetic and often use phrases like 'Let's solve this' or 'Try this calculation'.",
        "voice_id": "prof-sharma"
    },
    {
        "id": "ms-priya",
        "name": "Mrs. Priya",
        "subject_id": "math",
        "teaching_style": "Simple & Student-Friendly",
        "description": "Makes complex math seem like common sense. Uses simple language and analogies.",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
        "personality_prompt": "You are Mrs. Priya, a friendly and approachable Math teacher. You simplify complex topics using everyday analogies. You are very student-friendly, use simple language, and always check if the student understands before moving on.",
        "voice_id": "ms-priya"
    },

    # ── New clones extracted from uploaded lecture videos ─────────────────────
    {
        "id": "andrew-ml",
        "name": "Andrew",
        "subject_id": "ml",
        "teaching_style": "Intuition-First, Mathematically Rigorous",
        "description": "Builds deep intuition before diving into math. Known for clear visual explanations of complex ML concepts.",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=andrew-ml",
        "personality_prompt": (
            "You are Andrew, a Machine Learning instructor renowned for making complex ideas click. "
            "You always start with the intuition — why does this matter and how does it feel conceptually — "
            "before introducing any equations. You use concrete, relatable examples (housing prices, spam filters, "
            "cat vs dog classifiers) to anchor abstract ideas. Your tone is calm, encouraging, and genuinely "
            "excited about the subject. You break down math step-by-step, checking understanding at each stage. "
            "You frequently say things like 'Let me show you why this works' and 'The key insight here is…'. "
            "You treat every student as capable of mastering ML with the right explanation."
        ),
        "voice_id": "andrew-ml"
    },
    {
        "id": "david-c",
        "name": "David",
        "subject_id": "prog",
        "teaching_style": "Systems-Level, Bottom-Up",
        "description": "Teaches C from the ground up — memory, pointers, and systems thinking. No hand-holding on the fundamentals.",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=david-c",
        "personality_prompt": (
            "You are David, an expert C programming instructor with a systems engineering background. "
            "You teach from first principles: how the CPU works, what memory looks like, why pointers exist. "
            "You are direct, precise, and allergic to hand-waving. You use lots of code examples, often asking "
            "students to predict what a piece of code will do before running it. You believe deeply that "
            "understanding C makes you a fundamentally better programmer in any language. "
            "You say things like 'What does the compiler actually do here?' and 'Let's look at what's in memory'. "
            "You are not harsh, but you hold students to a high standard of precision."
        ),
        "voice_id": "david-c"
    },
    {
        "id": "erik-adsa",
        "name": "Erik",
        "subject_id": "ds",
        "teaching_style": "Problem-Pattern Recognition",
        "description": "Teaches algorithms through patterns and problem-solving frameworks. Interview-focused and highly systematic.",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=erik-adsa",
        "personality_prompt": (
            "You are Erik, an Algorithms and Data Structures instructor who thinks in patterns. "
            "For every problem, you first identify which algorithmic pattern applies (sliding window, two-pointer, "
            "DFS/BFS, dynamic programming, etc.) before writing a single line of code. "
            "You are highly systematic: you always walk through examples by hand first, then derive the algorithm, "
            "then analyze time and space complexity. You ask probing questions like 'What's the brute-force first?' "
            "and 'Where is the bottleneck?'. You are energetic, enjoy the elegance of good algorithms, and "
            "celebrate when students find a more efficient solution."
        ),
        "voice_id": "erik-adsa"
    },
    {
        "id": "grant-llm",
        "name": "Grant",
        "subject_id": "llm",
        "teaching_style": "Cutting-Edge Research Communicator",
        "description": "Explains the latest in LLM research accessibly. Bridges the gap between papers and practical understanding.",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=grant-llm",
        "personality_prompt": (
            "You are Grant, a Large Language Models instructor at the frontier of AI research. "
            "You are passionate about making recent breakthroughs (transformers, attention, RLHF, RAG, fine-tuning) "
            "understandable to practitioners. You explain things by analogy first, then unpack the math. "
            "You often reference specific papers (Attention Is All You Need, InstructGPT, etc.) and explain "
            "why design decisions were made. Your tone is enthusiastic and intellectually honest — you acknowledge "
            "what we don't fully understand yet. You say things like 'This is still an open research question' "
            "and 'Here's what the paper actually says vs what people think it says'."
        ),
        "voice_id": "grant-llm"
    },
]

class TeacherService:
    @staticmethod
    def get_subjects():
        if supabase is not None:
            try:
                response = supabase.table("subjects").select("*").execute()
                if response.data:
                    return response.data
            except Exception as e:
                print(f"Supabase Subjects Error: {e}")
        return SUBJECTS

    @staticmethod
    def get_resources_by_subject(subject_id: str):
        if supabase is not None:
            try:
                response = supabase.table("resources").select("*").eq("subject_id", subject_id).execute()
                if response.data:
                    return response.data
            except Exception as e:
                print(f"Supabase Resources Error: {e}")
        return RESOURCES.get(subject_id, [])

    @staticmethod
    def get_resource_by_id(resource_id: str):
        if supabase is not None:
            try:
                response = supabase.table("resources").select("*").eq("id", resource_id).single().execute()
                if response.data:
                    return response.data
            except Exception:
                pass
        
        for subject_resources in RESOURCES.values():
            for res in subject_resources:
                if res["id"] == resource_id:
                    return res
        return None

    @staticmethod
    def get_teachers_by_subject(subject_id: str):
        if supabase is not None:
            try:
                response = supabase.table("teachers").select("*").eq("subject_id", subject_id).execute()
                if response.data:
                    return response.data
            except Exception as e:
                print(f"Supabase Teachers Error: {e}")
        return [t for t in TEACHER_CLONES]

    @staticmethod
    def get_teacher_by_id(teacher_id: str):
        if supabase is not None:
            try:
                response = supabase.table("teachers").select("*").eq("id", teacher_id).single().execute()
                if response.data:
                    return response.data
            except Exception:
                pass
        return next((t for t in TEACHER_CLONES if t["id"] == teacher_id), None)

    @staticmethod
    def seed_db():
        """
        Upsert all subjects, teachers, resources, and voices into Supabase.
        Safe to call multiple times — uses upsert (ON CONFLICT DO UPDATE).
        """
        if supabase is None:
            return

        try:
            # Upsert subjects (includes new LLM subject)
            supabase.table("subjects").upsert(SUBJECTS).execute()
            print("[OK] Upserted subjects.")

            # Upsert teachers (includes new Andrew, David, Erik, Grant)
            supabase.table("teachers").upsert(TEACHER_CLONES).execute()
            print("[OK] Upserted teachers.")

            # Upsert resources
            all_resources = []
            for sub_id, res_list in RESOURCES.items():
                for r in res_list:
                    r_copy = dict(r)         # avoid mutating the constant
                    r_copy["subject_id"] = sub_id
                    all_resources.append(r_copy)
            if all_resources:
                supabase.table("resources").upsert(all_resources).execute()
                print("[OK] Upserted resources.")

            # Upsert voices (existing + new teacher voices)
            try:
                all_voices = [
                    {"id": "dr-rao",      "filename": "dr-rao.wav"},
                    {"id": "ms-priya",    "filename": "ms-priya.aac"},
                    {"id": "prof-sharma", "filename": "prof-sharma.wav"},
                    # New cloned voices (files generated by extract_teacher_voices.py)
                    {"id": "andrew-ml",   "filename": "andrew-ml.wav"},
                    {"id": "david-c",     "filename": "david-c.wav"},
                    {"id": "erik-adsa",   "filename": "erik-adsa.wav"},
                    {"id": "grant-llm",   "filename": "grant-llm.wav"},
                ]
                supabase.table("voices").upsert(all_voices).execute()
                print("[OK] Upserted voices (including cloned teacher voices).")
            except Exception as voice_err:
                print(f"[WARNING] Seeding voices table failed: {voice_err}")

        except Exception as e:
            print(f"[WARNING] Seeding failed: {e}. Ensure tables exist in Supabase.")

teacher_service = TeacherService()


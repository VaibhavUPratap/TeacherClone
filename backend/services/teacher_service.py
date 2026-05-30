from config import supabase
SUBJECTS = [
    {"id": "math", "name": "Mathematics", "icon": "Binary", "description": "Calculus, Algebra, and Statistics", "enrolled_count": 150},
    {"id": "physics", "name": "Physics", "icon": "Atom", "description": "Mechanics, Optics, and Thermodynamics", "enrolled_count": 120},
    {"id": "chem", "name": "Chemistry", "icon": "Beaker", "description": "Organic, Inorganic and Physical Chemistry", "enrolled_count": 95},
    {"id": "prog", "name": "Programming", "icon": "Code", "description": "Python, Java, and C++ Fundamentals", "enrolled_count": 200},
    {"id": "ml", "name": "Machine Learning", "icon": "Brain", "description": "Neural Networks, Data Science, and AI", "enrolled_count": 80},
    {"id": "ds", "name": "Data Structures", "icon": "Binary", "description": "Arrays, Lists, Trees, and Graphs", "enrolled_count": 110},
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
    }
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
        """Seeds the Supabase with mock data if it's empty."""
        if supabase is None:
            return
        
        try:
            # Check if subjects exist
            res = supabase.table("subjects").select("id", count="exact").limit(1).execute()
            if res.count == 0:
                supabase.table("subjects").insert(SUBJECTS).execute()
                print("[OK] Seeded subjects.")
            
            # Check if teachers exist
            res = supabase.table("teachers").select("id", count="exact").limit(1).execute()
            if res.count == 0:
                supabase.table("teachers").insert(TEACHER_CLONES).execute()
                print("[OK] Seeded teachers.")
            
            # Check if resources exist
            res = supabase.table("resources").select("id", count="exact").limit(1).execute()
            if res.count == 0:
                all_resources = []
                for sub_id, res_list in RESOURCES.items():
                    for r in res_list:
                        r["subject_id"] = sub_id
                        all_resources.append(r)
                if all_resources:
                    supabase.table("resources").insert(all_resources).execute()
                    print("[OK] Seeded resources.")

            # Check if default voices exist in public.voices
            try:
                res = supabase.table("voices").select("id", count="exact").limit(1).execute()
                if res.count == 0:
                    default_voices = [
                        {"id": "dr-rao", "filename": "dr-rao.wav"},
                        {"id": "ms-priya", "filename": "ms-priya.aac"},
                        {"id": "prof-sharma", "filename": "prof-sharma.wav"}
                    ]
                    supabase.table("voices").insert(default_voices).execute()
                    print("[OK] Seeded default voices.")
            except Exception as voice_err:
                print(f"[WARNING] Seeding voices table failed: {voice_err}")

        except Exception as e:
            print(f"[WARNING] Seeding failed: {e}. Ensure tables 'subjects', 'teachers', and 'resources' exist in Supabase.")

teacher_service = TeacherService()


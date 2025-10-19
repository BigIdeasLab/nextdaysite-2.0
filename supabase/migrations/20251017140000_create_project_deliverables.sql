CREATE TYPE deliverable_status AS ENUM ('pending', 'in_progress', 'completed');

CREATE TABLE project_deliverables (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status deliverable_status DEFAULT 'pending'
);
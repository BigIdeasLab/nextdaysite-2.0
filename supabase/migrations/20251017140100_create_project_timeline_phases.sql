CREATE TYPE timeline_phase_status AS ENUM ('pending', 'in_progress', 'completed');

CREATE TABLE project_timeline_phases (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    status timeline_phase_status DEFAULT 'pending'
);
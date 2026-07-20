"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  GripVertical,
  BookOpen,
  AlertTriangle,
} from "lucide-react";

type Lesson = {
  id: string;
  title: string;
  content: string | null;
  free_preview: boolean;
  order: number;
};

type Module = {
  id: string;
  title: string;
  order: number;
  lesson: Lesson[];
};

export default function ModulesEditor({
  courseId,
  initialModules,
}: {
  courseId: string;
  initialModules: Module[];
}) {
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [addingModule, setAddingModule] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [deletePopover, setDeletePopover] = useState<string | null>(null);

  const toggleExpanded = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const addModule = async () => {
    if (!newModuleTitle.trim()) return;
    setAddingModule(true);
    try {
      const res = await fetch("/api/admin/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course_id: courseId,
          title: newModuleTitle.trim(),
          order: modules.length,
        }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setModules((prev) => [
        ...prev,
        { id: data.id, title: newModuleTitle.trim(), order: prev.length, lesson: [] },
      ]);
      setNewModuleTitle("");
      setExpanded((prev) => ({ ...prev, [data.id]: true }));
    } finally {
      setAddingModule(false);
    }
  };

  const deleteModule = async (moduleId: string) => {
    setModules((prev) => prev.filter((m) => m.id !== moduleId));
    setDeletePopover(null);
    await fetch(`/api/admin/modules/${moduleId}`, { method: "DELETE" }).catch(() => {});
  };

  const renameModule = async (moduleId: string, title: string) => {
    setModules((prev) => prev.map((m) => (m.id === moduleId ? { ...m, title } : m)));
    await fetch(`/api/admin/modules/${moduleId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    }).catch(() => {});
  };

  const addLesson = async (moduleId: string, title: string) => {
    if (!title.trim()) return;
    const mod = modules.find((m) => m.id === moduleId);
    const order = mod?.lesson.length ?? 0;
    const res = await fetch("/api/admin/lessons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ module_id: moduleId, title: title.trim(), order }),
    });
    if (!res.ok) return;
    const data = await res.json();
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              lesson: [
                ...m.lesson,
                { id: data.id, title: title.trim(), content: "", free_preview: false, order },
              ],
            }
          : m
      )
    );
  };

  const updateLesson = async (moduleId: string, lessonId: string, patch: Partial<Lesson>) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? { ...m, lesson: m.lesson.map((l) => (l.id === lessonId ? { ...l, ...patch } : l)) }
          : m
      )
    );
    await fetch(`/api/admin/lessons/${lessonId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    }).catch(() => {});
  };

  const deleteLesson = async (moduleId: string, lessonId: string) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId ? { ...m, lesson: m.lesson.filter((l) => l.id !== lessonId) } : m
      )
    );
    await fetch(`/api/admin/lessons/${lessonId}`, { method: "DELETE" }).catch(() => {});
  };

  return (
    <div className="space-y-4">
      {modules.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-site-border">
          <div className="w-12 h-12 mx-auto rounded-xl bg-site-highlight flex items-center justify-center mb-3">
            <BookOpen className="w-6 h-6 text-site-muted" />
          </div>
          <p className="text-site-muted text-sm">No modules yet</p>
          <p className="text-xs text-site-muted mt-1">
            Add your first module below to start organizing lessons.
          </p>
        </div>
      )}

      {modules.map((mod, index) => (
        <div
          key={mod.id}
          className="bg-white border border-site-border rounded-2xl overflow-hidden"
        >
          {/* Module header */}
          <div className="flex items-center gap-3 px-5 py-4 bg-site-highlight/50">
            <button
              onClick={() => toggleExpanded(mod.id)}
              className="p-1 rounded-lg text-site-muted hover:text-site-text hover:bg-white transition-colors cursor-pointer"
            >
              {expanded[mod.id] ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            <span className="text-xs font-mono font-bold text-site-muted bg-white rounded-lg px-2 py-1 shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>

            <input
              key={mod.id}
              defaultValue={mod.title}
              onBlur={(e) => e.target.value !== mod.title && renameModule(mod.id, e.target.value)}
              className="bg-transparent font-semibold text-site-text flex-1 focus:outline-none focus:bg-white rounded-lg px-2 py-1.5 text-sm transition-colors"
            />

            <span className="text-xs text-site-muted shrink-0">
              {mod.lesson.length} lesson{mod.lesson.length !== 1 ? "s" : ""}
            </span>

            <button
              onClick={() => setDeletePopover(mod.id)}
              className="p-1.5 rounded-lg text-site-muted hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Lessons */}
          {expanded[mod.id] && (
            <div className="p-5 space-y-3 border-t border-site-border">
              {mod.lesson.length === 0 && (
                <p className="text-xs text-site-muted text-center py-4">
                  No lessons in this module yet.
                </p>
              )}
              {mod.lesson.map((lesson) => (
                <LessonRow
                  key={lesson.id}
                  lesson={lesson}
                  onUpdate={(patch) => updateLesson(mod.id, lesson.id, patch)}
                  onDelete={() => deleteLesson(mod.id, lesson.id)}
                />
              ))}
              <NewLessonInput onAdd={(title) => addLesson(mod.id, title)} />
            </div>
          )}
        </div>
      ))}

      {/* Add module */}
      <div className="flex items-center gap-3 pt-2">
        <input
          value={newModuleTitle}
          onChange={(e) => setNewModuleTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addModule()}
          placeholder="New module title..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-site-border bg-white text-site-text text-sm placeholder:text-site-muted/60 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all"
        />
        <button
          onClick={addModule}
          disabled={addingModule || !newModuleTitle.trim()}
          className="inline-flex items-center gap-2 bg-site-primary text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-site-primary/95 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add module
        </button>
      </div>

      {/* Delete confirmation popover */}
      {deletePopover && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-site-border shadow-2xl p-6 w-full max-w-sm mx-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-site-text">Delete this module?</p>
                <p className="text-xs text-site-muted mt-1">
                  All lessons inside this module will also be permanently deleted.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDeletePopover(null)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-site-text border border-site-border hover:bg-site-highlight transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteModule(deletePopover)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LessonRow({
  lesson,
  onUpdate,
  onDelete,
}: {
  lesson: Lesson;
  onUpdate: (patch: Partial<Lesson>) => void;
  onDelete: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const [title, setTitle] = useState(lesson.title);
  const [content, setContent] = useState(lesson.content ?? "");

  return (
    <div className="border border-site-border rounded-xl p-4 bg-site-background">
      <div className="flex items-center gap-2 mb-3">
        <GripVertical className="w-4 h-4 text-site-muted shrink-0" />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => title !== lesson.title && onUpdate({ title })}
          className="flex-1 bg-transparent text-sm font-medium text-site-text focus:outline-none focus:bg-white rounded-lg px-2 py-1.5 transition-colors"
        />
        <button
          onClick={() => onUpdate({ free_preview: !lesson.free_preview })}
          title={lesson.free_preview ? "Free preview: on" : "Free preview: off"}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            lesson.free_preview
              ? "text-site-accent bg-site-accent/10 hover:bg-site-accent/20"
              : "text-site-muted hover:bg-site-highlight"
          }`}
        >
          {lesson.free_preview ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>
        {confirming ? (
          <div className="flex items-center gap-1.5">
            <button
              onClick={onDelete}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 cursor-pointer"
            >
              Confirm
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="text-[11px] px-2.5 py-1 rounded-lg text-site-muted hover:bg-site-highlight cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirming(true)}
            className="p-1.5 rounded-lg text-site-muted hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={() => content !== (lesson.content ?? "") && onUpdate({ content })}
        rows={3}
        placeholder="Lesson content (markdown)..."
        className="w-full text-sm px-3 py-2 rounded-xl border border-site-border bg-white text-site-text placeholder:text-site-muted/60 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all resize-none"
      />
    </div>
  );
}

function NewLessonInput({ onAdd }: { onAdd: (title: string) => void }) {
  const [title, setTitle] = useState("");
  return (
    <div className="flex items-center gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && title.trim()) {
            onAdd(title);
            setTitle("");
          }
        }}
        placeholder="New lesson title..."
        className="flex-1 px-3 py-2 rounded-xl border border-site-border bg-white text-sm placeholder:text-site-muted/60 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all"
      />
      <button
        onClick={() => {
          if (title.trim()) {
            onAdd(title);
            setTitle("");
          }
        }}
        className="text-xs font-semibold px-3 py-2 rounded-xl border border-site-border text-site-text hover:bg-site-highlight transition-colors cursor-pointer shrink-0"
      >
        Add lesson
      </button>
    </div>
  );
}
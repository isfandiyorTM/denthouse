import { useState } from "react";
import { CATEGORIES } from "../data/constants";
import styles from "./Admin.module.css";

const EMPTY_FORM = {
  title: "", category: "toyota", carModel: "",
  beforeUrl: "", afterUrl: "", description: "",
};

export default function Admin({ loggedIn, loginError, onLogin, onLogout, videos, onAdd, onUpdate, onDelete }) {
  const [pw,      setPw]      = useState("");
  const [form,    setForm]    = useState(EMPTY_FORM);
  const [editId,  setEditId]  = useState(null);
  const [msg,     setMsg]     = useState("");
  const [msgType, setMsgType] = useState("ok");

  function flash(text, type = "ok") {
    setMsg(text);
    setMsgType(type);
    setTimeout(() => setMsg(""), 3000);
  }

  function handleLogin(e) {
    e.preventDefault();
    onLogin(pw);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.beforeUrl || !form.afterUrl) {
      flash("Please fill in all required fields.", "er");
      return;
    }
    if (editId) {
      onUpdate(editId, form);
      setEditId(null);
      flash("Video updated successfully!");
    } else {
      onAdd(form);
      flash("Video uploaded successfully!");
    }
    setForm(EMPTY_FORM);
  }

  function startEdit(v) {
    setEditId(v.id);
    setForm({ title: v.title, category: v.category, carModel: v.carModel,
              beforeUrl: v.beforeUrl, afterUrl: v.afterUrl, description: v.description });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditId(null);
    setForm(EMPTY_FORM);
  }

  /* ── Login screen ──────────────────────────── */
  if (!loggedIn) {
    return (
      <div className={styles.loginWrap}>
        <div className={styles.loginCard}>
          <div className={styles.loginIcon}>🔐</div>
          <h2>Admin Access</h2>
          <p>Enter your password to manage DentHouse videos</p>
          {loginError && <div className={`${styles.msg} ${styles.er}`}>{loginError}</div>}
          <form onSubmit={handleLogin}>
            <input
              className={styles.input}
              type="password"
              placeholder="Enter admin password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              autoFocus
            />
            <button className={styles.submitBtn} type="submit" style={{ width: "100%", marginTop: 10 }}>
              Sign In →
            </button>
          </form>
          <p className={styles.hint}>Hint: denthouse2024</p>
        </div>
      </div>
    );
  }

  /* ── Admin dashboard ───────────────────────── */
  return (
    <div className={styles.wrap}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pill}>Admin Panel</div>
        <h2>Video Management</h2>
        <p>Upload and manage before/after dent repair videos</p>
      </div>

      {/* Upload / Edit form */}
      <div className={styles.formCard}>
        <h3>{editId ? "✏️ Edit Video" : "⬆️ Upload New Video"}</h3>
        {msg && <div className={`${styles.msg} ${styles[msgType]}`}>{msg}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>Video Title *</label>
              <input className={styles.input} placeholder="e.g. Toyota Camry Front Dent"
                value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Car Model</label>
              <input className={styles.input} placeholder="e.g. BMW 3 Series 2022"
                value={form.carModel} onChange={(e) => setForm({ ...form, carModel: e.target.value })} />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Category</label>
            <select className={styles.input} value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>Before Video URL *</label>
              <input className={styles.input} placeholder="https://..."
                value={form.beforeUrl} onChange={(e) => setForm({ ...form, beforeUrl: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>After Video URL *</label>
              <input className={styles.input} placeholder="https://..."
                value={form.afterUrl} onChange={(e) => setForm({ ...form, afterUrl: e.target.value })} />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <textarea className={styles.input} rows={3}
              placeholder="Brief description of the dent repair..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ resize: "vertical" }}
            />
          </div>

          <div className={styles.btnRow}>
            <button className={styles.submitBtn} type="submit">
              {editId ? "Update Video" : "Upload Video"}
            </button>
            {editId && (
              <button type="button" className={styles.cancelBtn} onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Video list */}
      <div>
        <h3 className={styles.listTitle}>All Videos ({videos.length})</h3>
        <div className={styles.list}>
          {videos.map((v) => (
            <div key={v.id} className={styles.listItem}>
              <div className={styles.listIcon}>▶</div>
              <div className={styles.listInfo}>
                <div className={styles.listName}>{v.title}</div>
                <div className={styles.listMeta}>
                  {v.carModel} · {CATEGORIES.find((c) => c.id === v.category)?.label} · {v.date}
                </div>
              </div>
              <button className={styles.iconBtn} onClick={() => startEdit(v)}>Edit</button>
              <button
                className={`${styles.iconBtn} ${styles.delBtn}`}
                onClick={() => { if (window.confirm("Delete this video?")) onDelete(v.id); }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

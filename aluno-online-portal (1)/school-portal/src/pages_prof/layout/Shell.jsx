import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Shell({ atual, onNavegar, onSair, breadcrumb, children }) {
  return (
    <div className="po-shell">
      <Sidebar atual={atual} onNavegar={onNavegar} />
      <div className="po-main">
        <Topbar onSair={onSair} />
        <div className="po-breadcrumb">{breadcrumb}</div>
        <main className="po-content">{children}</main>
      </div>
    </div>
  );
}

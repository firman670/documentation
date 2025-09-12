import React, { useState } from "react";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import { UploadCloud, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import "../css/uploadStyle.css";

export default function UploadPage() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [showPathPopup, setShowPathPopup] = useState(false);
  const [selectedPath, setSelectedPath] = useState(null);
  const [activePath, setActivePath] = useState(null);
  const [expandedPaths, setExpandedPaths] = useState([]);

  const rawData = {
    "library-mobile": {
      name: "library-mobile",
      path: "library-mobile",
      children: {
        "flutter-sdk": {
          name: "flutter-sdk",
          path: "library-mobile/flutter-sdk",
          children: {
            customization: {
              name: "customization",
              path: "library-mobile/flutter-sdk/customization",
              children: [],
            },
          },
        },
        "react-native": {
          name: "react-native",
          path: "library-mobile/react-native",
          children: [],
        },
      },
    },
    "tutorial-extras": {
      name: "tutorial-extras",
      path: "tutorial-extras",
      children: {
        img: {
          name: "img",
          path: "tutorial-extras/img",
          children: [],
        },
      },
    },
  };

  const convertToFolderArray = (obj) => {
    const result = [];

    for (const key in obj) {
      const item = obj[key];
      const children = item.children || {};

      result.push({
        ...item,
        children: convertToFolderArray(children),
      });
    }

    return result;
  };

  const folderStructure = {
    children: convertToFolderArray(rawData),
  };

  const toggleExpand = (path) => {
    setExpandedPaths((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  const FolderTree = ({
    node,
    depth = 0,
    path = "",
    activePath,
    setActivePath,
    expandedPaths,
    toggleExpand,
  }) => {
    const isFolder = !!node.children;
    const fullPath = path ? `${path}/${node.name}` : node.name;
    const isOpen = expandedPaths.includes(fullPath);

    const handleExpandCollapse = (e) => {
      e.stopPropagation();
      if (isFolder) toggleExpand(fullPath);
    };

    const handleSelect = (e) => {
      e.stopPropagation();
      if (isFolder) {
        if (activePath === fullPath) {
          setActivePath(null);
        } else {
          setActivePath(fullPath);
        }
      }
    };

    return (
      <div style={{ marginLeft: depth * 16 }} className="folderTreeItem">
        <div className="folderItemWrapper">
          <button
            className={`folderItem ${isFolder ? "folder" : "file"} ${
              activePath === fullPath ? "selected" : ""
            }`}
            onClick={handleExpandCollapse}
          >
            {isFolder ? (isOpen ? "📂" : "📁") : "📄"} {node.name}
          </button>
          {isFolder && (
            <button className="selectBtn" onClick={handleSelect}>
              {activePath === fullPath ? "✅" : "⬜"}
            </button>
          )}
        </div>

        {isOpen && isFolder && (
          <div className="folderChildren">
            {node.children.map((child, idx) => (
              <FolderTree
                key={idx}
                node={child}
                depth={depth + 1}
                path={fullPath}
                activePath={activePath}
                setActivePath={setActivePath}
                expandedPaths={expandedPaths}
                toggleExpand={toggleExpand}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setStatus("uploading");
    setTimeout(() => {
      setStatus("success");
      setShowPathPopup(true);
    }, 2000);
  };

  const handleFileChange = (e) => {
    const picked = e.target.files?.[0];
    if (picked) {
      setFile(picked);
      simulateUpload();
    }
  };

  const reset = () => {
    setFile(null);
    setStatus("idle");
    setSelectedPath(null);
    setActivePath(null);
  };

  const handleConfirmPath = () => {
    setSelectedPath(activePath);
    setShowPathPopup(false);
    console.log("Selected Path:", activePath);
  };

  return (
    <Layout title="Upload File">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          className={`uploadBox ${dragging ? "dragging" : ""}`}
        >
          {status === "idle" && (
            <motion.div
              className="uploadContent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <UploadCloud size={48} className="uploadIcon" />
              <h2 className="title">Upload Your File</h2>
              <p className="subtitle">Drag & drop or browse from your device</p>
              <label
                htmlFor="fileInput"
                className="browseButton !bg-[#2A68EE] dark:!bg-[#1B84FF] transition-colors"
              >
                Browse File
              </label>
              <input
                id="fileInput"
                type="file"
                className="fileInput"
                onChange={handleFileChange}
              />
              <div className="supportedFormats">Supported: .md & .mdx</div>
            </motion.div>
          )}

          {status === "uploading" && (
            <motion.div
              className="uploadingContent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Loader2 size={40} className="statusIcon spinner" />
              <p className="subtitle">
                Uploading <strong>{file?.name}</strong>...
              </p>
              <div className="progressContainer">
                <motion.div
                  className="progressBar"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                />
              </div>
              <p className="progressText">Please wait...</p>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              className="statusContent"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CheckCircle size={48} className="statusIcon success" />
              <p className="title">Upload Successful</p>
              <p className="subtitle">{file?.name}</p>
              {selectedPath && (
                <p className="selectedPath">
                  Path: <code>{selectedPath}</code>
                </p>
              )}
              <button className="resetButton" onClick={reset}>
                Upload Another
              </button>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              className="statusContent"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <AlertTriangle size={48} className="statusIcon error" />
              <p className="title">Upload Failed</p>
              <p className="subtitle">Something went wrong.</p>
              <button className="resetButton" onClick={reset}>
                Try Again
              </button>
            </motion.div>
          )}

          {showPathPopup && (
            <div className="modalOverlay">
              <motion.div
                className="modalBox"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3>Select Folder Path</h3>
                <div className="folderTree">
                  {folderStructure.children.map((node, idx) => (
                    <FolderTree
                      key={idx}
                      node={node}
                      activePath={activePath}
                      setActivePath={setActivePath}
                      expandedPaths={expandedPaths}
                      toggleExpand={toggleExpand}
                    />
                  ))}
                </div>
                <div className="modalFooter">
                  <button
                    className="confirmButton"
                    onClick={handleConfirmPath}
                    disabled={!activePath}
                  >
                    Confirm
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}

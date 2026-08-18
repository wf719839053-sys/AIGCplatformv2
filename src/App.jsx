import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CaretDown,
  CaretLeft,
  CaretRight,
  Check,
  ClockCounterClockwise,
  DownloadSimple,
  Eraser,
  FolderOpen,
  House,
  ListChecks,
  MagicWand,
  MagnifyingGlass,
  PaintBrush,
  Play,
  Plus,
  SlidersHorizontal,
  Sparkle,
  SpinnerGap,
  TextT,
  UserCircle,
  VideoCamera,
  X,
} from '@phosphor-icons/react';

const furnitureAssets = {
  chair: '/assets/tool-smart-replace.png',
  room: '/assets/tool-style-scene.png',
  cabinet: '/assets/tool-white-background.png',
};

const videoTools = [
  { id: 'video-replace', name: '视频智能替换', short: '替换家具、材质或出镜人物', desc: '定位视频中的目标对象，生成稳定替换预览后再输出完整视频。', icon: VideoCamera, image: furnitureAssets.room, tag: '主推' },
  { id: 'subtitle', name: '去字幕 / 水印', short: '框选干扰区域并自然修复', desc: '智能识别或手动涂抹字幕与水印，保留原视频时长与音轨。', icon: TextT, image: furnitureAssets.room, tag: 'P0' },
];

const tasks = [
  { title: '橡木餐桌场景替换', tool: '视频智能替换', status: '生成中', progress: 68, time: '2 分钟前', image: furnitureAssets.room },
  { title: '北美站短视频去字幕', tool: '去字幕 / 水印', status: '草稿', progress: 18, time: '18 分钟前', image: furnitureAssets.room },
  { title: '餐边柜材质视频替换', tool: '视频智能替换', status: '已完成', progress: 100, time: '今天 09:42', image: furnitureAssets.cabinet },
];

function NavButton({ icon: Icon, label, active, badge, onClick }) {
  return (
    <button className={`nav-button ${active ? 'active' : ''}`} onClick={onClick}>
      <Icon size={19} weight={active ? 'fill' : 'regular'} />
      <span>{label}</span>
      {badge && <span className="nav-badge">{badge}</span>}
    </button>
  );
}

function Sidebar({ currentTool, isHome, onHome, onTool, onTasks, notify }) {
  const [videoOpen, setVideoOpen] = useState(true);

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark"><Sparkle size={21} weight="fill" /></span>
        <div><strong>源氏木语</strong><span>LINGXI AIGC · MVP</span></div>
        <em className="mvp-version-badge">简版</em>
      </div>
      <nav className="side-nav">
        <NavButton icon={House} label="首页" active={isHome} onClick={onHome} />
        <NavButton icon={ListChecks} label="任务管理" badge="3" onClick={onTasks} />
        <p className="nav-caption">创作工具</p>
        <button className={`nav-button nav-parent ${videoTools.some((item) => item.id === currentTool?.id) ? 'parent-active' : ''}`} onClick={() => setVideoOpen(!videoOpen)}>
          <VideoCamera size={19} /><span>视频创作</span>{videoOpen ? <CaretDown size={15} /> : <CaretRight size={15} />}
        </button>
        {videoOpen && <div className="subnav">{videoTools.map((tool) => <button className={currentTool?.id === tool.id ? 'active' : ''} key={tool.id} onClick={() => onTool(tool)}>{tool.name}</button>)}</div>}
      </nav>
      <div className="sidebar-bottom">
        <NavButton icon={FolderOpen} label="资源中心" onClick={() => notify('已进入资源中心预览')} />
        <NavButton icon={SlidersHorizontal} label="设置" onClick={() => notify('已进入设置预览')} />
        <div className="user-card"><UserCircle size={32} weight="duotone" /><div><strong>吴凡</strong><span>跨境运营</span></div><CaretRight size={15} /></div>
      </div>
    </aside>
  );
}

function ToolCard({ tool, onOpen }) {
  const Icon = tool.icon;
  return (
    <article className="tool-card" onClick={() => onOpen(tool)} tabIndex="0" onKeyDown={(event) => event.key === 'Enter' && onOpen(tool)}>
      <div className="tool-image-wrap">
        <img src={tool.image} alt={`${tool.name}家具效果示例`} />
        <span className="tool-tag">{tool.tag}</span>
        <span className="tool-icon"><Icon size={20} weight="duotone" /></span>
      </div>
      <div className="tool-copy">
        <div><h3>{tool.name}</h3><p>{tool.short}</p></div>
        <span className="round-arrow"><ArrowRight size={17} /></span>
      </div>
    </article>
  );
}

function Topbar({ query, setQuery, notify }) {
  return (
    <header className="topbar">
      <div><p>LINGXI WORKSPACE</p><h1>上午好，吴凡</h1></div>
      <div className="top-actions">
        <label className="global-search"><MagnifyingGlass size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索创作工具" /><kbd>⌘ K</kbd></label>
        <button className="icon-button notification" onClick={() => notify('暂无新通知')} aria-label="通知"><Bell size={20} /><i /></button>
      </div>
    </header>
  );
}

function HomePage({ onTool, onTasks, notify }) {
  const [query, setQuery] = useState('');
  const visibleTools = useMemo(() => videoTools.filter((tool) => `${tool.name}${tool.short}${tool.desc}`.includes(query.trim())), [query]);

  return (
    <main className="main-content">
      <Topbar query={query} setQuery={setQuery} notify={notify} />
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkle size={14} weight="fill" /> MVP 视频内容处理</span>
          <h2>先跑通视频处理，<br />再稳定扩展创作能力。</h2>
          <p>聚焦视频智能替换与去字幕、水印两项核心任务，用更短路径完成上传、设置、预览和结果保存。</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => onTool(videoTools[0])}><Play size={18} weight="fill" />立即创作</button>
            <button className="ghost-button" onClick={() => document.querySelector('#apps')?.scrollIntoView({ behavior: 'smooth' })}>查看视频工具 <ArrowRight size={17} /></button>
          </div>
        </div>
        <div className="hero-visual">
          <img src={furnitureAssets.room} alt="实木家具场景生成示例" />
          <div className="hero-chip top"><span><VideoCamera size={16} weight="duotone" /></span><div><b>视频智能替换</b><small>家具 · 材质 · 人物</small></div></div>
          <div className="hero-chip bottom"><span className="success-dot"><Check size={12} weight="bold" /></span><div><b>家具场景预览完成</b><small>00:15 · 1080P</small></div></div>
        </div>
      </section>

      <section className="apps-section" id="apps">
        <div className="section-head apps-head">
          <div><span className="section-kicker">VIDEO WORKFLOW</span><h2>视频创作</h2><p>当前 MVP 仅保留两项核心能力，用于验证完整的视频处理流程。</p></div>
        </div>
        {visibleTools.length ? <div className="tools-grid">{visibleTools.map((tool) => <ToolCard key={tool.id} tool={tool} onOpen={onTool} />)}</div> : <div className="empty-state"><MagnifyingGlass size={30} /><h3>没有找到匹配工具</h3><p>试试搜索“替换”“字幕”或“水印”。</p></div>}
      </section>
      <footer className="page-footer"><span>灵犀 AIGC · MVP 视频处理工作台</span><span>生成内容请按公司规范使用</span></footer>
    </main>
  );
}

function UploadPanel({ uploaded, setUploaded, multiple = true, label = '添加家具图片', formats = 'JPG / PNG', uploadedLabel = '已添加 2 张家具素材', uploadedFiles = 'living-room.jpg · oak-chair.jpg' }) {
  return (
    <button className={`upload-panel ${uploaded ? 'uploaded' : ''}`} onClick={() => setUploaded(true)}>
      {uploaded ? <Check size={22} weight="bold" /> : <Plus size={24} />}
      <strong>{uploaded ? uploadedLabel : label}</strong>
      <span>{uploaded ? uploadedFiles : `${multiple ? '支持多图上传，' : ''}${formats}，单个文件不超过 200 MB`}</span>
    </button>
  );
}

function StepLabel({ number, title, description }) {
  return <div className="panel-label"><span>{number}</span><div><b>{title}</b><small>{description}</small></div></div>;
}

function ToggleRow({ label, description, checked, onChange }) {
  return (
    <button className="toggle-row" onClick={() => onChange(!checked)} role="switch" aria-checked={checked}>
      <span><b>{label}</b><small>{description}</small></span>
      <i className={checked ? 'on' : ''}><em /></i>
    </button>
  );
}

function VideoAdvancedSettings() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  return (
    <div className="video-advanced-settings">
      <div className="inline-fields three"><label><span>视频比例</span><select><option>16 : 9</option><option>9 : 16</option><option>1 : 1</option></select></label><label><span>画质</span><select><option>1080P</option><option>2K</option><option>4K</option></select></label><label><span>视频时长</span><select><option>5 秒</option><option>10 秒</option><option>15 秒</option></select></label></div>
      <ToggleRow label="生成音频" description="同时生成环境音或口播音轨" checked={audioEnabled} onChange={setAudioEnabled} />
    </div>
  );
}

function WorkspaceHeader({ tool, onBack, onTasks }) {
  const Icon = tool.icon;
  return (
    <header className="workspace-header">
      <div className="workspace-title"><button className="icon-button" onClick={onBack} aria-label="返回首页"><ArrowLeft size={19} /></button><span><Icon size={19} weight="duotone" /></span><div><p>创作工具 / 视频创作</p><h1>{tool.name}</h1></div></div>
      <button className="workspace-task-link" onClick={onTasks}><ClockCounterClockwise size={17} />任务记录</button>
    </header>
  );
}

function VideoHistoryRail({ tool, collapsed, onToggle }) {
  const records = [
    { title: `${tool.name}预览`, time: '刚刚', image: tool.image },
    { title: '北美站客厅场景', time: '昨天 16:20', image: furnitureAssets.room },
    { title: '餐边柜材质替换', time: '8月5日', image: furnitureAssets.cabinet },
  ];

  return (
    <aside className={`video-history-rail ${collapsed ? 'collapsed' : ''}`}>
      <header>
        {!collapsed && <div><span>HISTORY</span><h3>历史记录</h3></div>}
        <button className="history-toggle" onClick={onToggle} aria-label={collapsed ? '展开历史记录' : '收起历史记录'} aria-expanded={!collapsed}>
          {collapsed ? <CaretLeft size={17} /> : <CaretRight size={17} />}
        </button>
      </header>
      {collapsed ? <div className="collapsed-history-label"><ClockCounterClockwise size={20} /><span>历史记录</span></div> : <div className="video-history-list">
        {records.map((record, index) => <button className={index === 0 ? 'active' : ''} key={`${record.title}-${record.time}`}>
          <img src={record.image} alt={`${record.title}缩略图`} />
          <span><b>{record.title}</b><small>{record.time}</small></span>
        </button>)}
      </div>}
    </aside>
  );
}

function StandardVideoWorkbench({ tool, onBack, onTasks, notify }) {
  const [uploaded, setUploaded] = useState(false);
  const [targetUploaded, setTargetUploaded] = useState(false);
  const [status, setStatus] = useState('idle');
  const [eraseMode, setEraseMode] = useState('智能选区');
  const [historyCollapsed, setHistoryCollapsed] = useState(false);
  const [creativeBrief, setCreativeBrief] = useState('');

  const generate = () => {
    setStatus('generating');
    window.setTimeout(() => { setStatus('done'); notify(`${tool.name}预览已生成`); }, 1300);
  };

  return (
    <main className="workspace-main">
      <WorkspaceHeader tool={tool} onBack={onBack} onTasks={onTasks} />
      <div className={`workbench video-workbench ${historyCollapsed ? 'history-collapsed' : ''}`}>
        <aside className="control-panel video-controls">
          <div className="panel-section"><StepLabel number="01" title={tool.id === 'subtitle' ? '上传原视频' : '需要更改的内容'} description="支持 MP4 / MOV，建议 5–30 秒" /><UploadPanel uploaded={uploaded} setUploaded={setUploaded} multiple={false} label={tool.id === 'subtitle' ? '添加待处理视频' : '添加需要更改的视频'} formats="MP4 / MOV" uploadedLabel="视频已添加" uploadedFiles="solid-wood-living-room.mp4 · 00:15" /></div>

          {tool.id === 'video-replace' && <div className="panel-section"><StepLabel number="02" title="目标素材" description="直接上传目标图片或参考视频" /><UploadPanel uploaded={targetUploaded} setUploaded={setTargetUploaded} multiple={false} label="添加目标图片 / 视频" formats="JPG / PNG / MP4 / MOV" uploadedLabel="目标素材已添加" uploadedFiles="target-oak-cabinet.png" /><div className="mvp-flow-note"><Sparkle size={13} weight="fill" /><span><b>MVP 简版</b> 当前仅支持本地上传目标素材，素材库将在完整版中提供。</span></div></div>}

          {tool.id === 'subtitle' && <div className="panel-section flex-fill"><StepLabel number="02" title="AI 消除" description="选择字幕或水印区域" /><div className="erase-tabs">{['智能选区', '涂抹选区', '擦除选区'].map((item) => <button className={eraseMode === item ? 'active' : ''} onClick={() => setEraseMode(item)} key={item}>{item === '擦除选区' ? <Eraser size={16} /> : item === '涂抹选区' ? <PaintBrush size={16} /> : <MagicWand size={16} />}{item}</button>)}</div><label className="range-field"><span>画笔大小 <b>40</b></span><input type="range" min="10" max="80" defaultValue="40" /></label><label className="check-row"><input type="checkbox" defaultChecked />自动识别连续字幕区域</label></div>}

          {tool.id === 'video-replace' && <div className="panel-section flex-fill"><StepLabel number="03" title="视频设置" description="描述生成目标并设置输出参数" /><label className="field-label">创作需求</label><textarea className="prompt-input compact" value={creativeBrief} onChange={(event) => setCreativeBrief(event.target.value)} placeholder="例如：将视频中的沙发替换为目标实木沙发，保持镜头运动、人物动作和环境光" />
            <label className="field-label">输出规格与生成设置</label><VideoAdvancedSettings />
          </div>}
          <button className="generate-button" disabled={!uploaded || (tool.id === 'video-replace' && !targetUploaded) || status === 'generating'} onClick={generate}>{status === 'generating' ? <><SpinnerGap className="spin" size={18} />正在处理</> : <><Sparkle size={18} weight="fill" />生成视频</>}</button>
        </aside>
        <section className="preview-stage video-stage">
          <div className="stage-toolbar"><span>{status === 'done' ? '视频预览' : '预览等待区'}</span><div><button>画面</button><button>音轨</button></div></div>
          <div className={`video-canvas ${status}`}>
            {!uploaded && <div className="empty-preview"><span><VideoCamera size={32} weight="duotone" /></span><h2>添加需要更改的视频，开始创作</h2><p>上传后将在这里预览原视频、目标素材与生成结果</p></div>}
            {uploaded && status !== 'generating' && <div className="video-frame"><img src={tool.image} alt="家具视频预览画面" /><button aria-label="播放"><Play size={25} weight="fill" /></button><span>00:00 / 00:15</span>{tool.id === 'subtitle' && <div className="selection-box"><i /><i /><i /><i /></div>}</div>}
            {status === 'generating' && <div className="generation-state"><SpinnerGap className="spin" size={36} /><h2>正在处理视频</h2><p>正在分析镜头、家具主体与时间范围…</p><div className="generation-progress"><i /></div></div>}
          </div>
          <div className="timeline"><span>00:00</span><div><i style={{ width: status === 'done' ? '100%' : uploaded ? '36%' : '0%' }} /><b /></div><span>00:15</span></div>
          <div className="stage-footer"><span>生成任务可在后台运行</span><div><button>重新设置</button><button className="dark" onClick={() => notify('视频已保存到资源中心')}>保存结果</button></div></div>
        </section>
        <VideoHistoryRail tool={tool} collapsed={historyCollapsed} onToggle={() => setHistoryCollapsed(!historyCollapsed)} />
      </div>
    </main>
  );
}

function TaskDrawer({ onClose, notify }) {
  return (
    <div className="drawer-backdrop" onMouseDown={onClose}>
      <aside className="task-drawer" onMouseDown={(event) => event.stopPropagation()}>
        <header><div><p>TASK CENTER</p><h2>任务管理</h2></div><button className="icon-button" onClick={onClose}><X size={20} /></button></header>
        <div className="drawer-tabs"><button className="active">全部 3</button><button>进行中 1</button><button>已完成 1</button></div>
        <div className="drawer-list">{tasks.map((task) => <article key={task.title}><div className="drawer-thumb"><img src={task.image} alt="" /></div><div className="drawer-info"><div><strong>{task.title}</strong><span className={task.status === '已完成' ? 'done' : ''}>{task.status}</span></div><p>{task.tool} · {task.time}</p><div className="progress"><i style={{ width: `${task.progress}%` }} /></div><div className="drawer-actions"><button onClick={() => notify('已打开任务详情')}>查看详情</button>{task.status === '已完成' && <button><DownloadSimple size={14} />下载</button>}</div></div></article>)}</div>
      </aside>
    </div>
  );
}

export function App() {
  const [currentTool, setCurrentTool] = useState(null);
  const [taskDrawer, setTaskDrawer] = useState(false);
  const [toast, setToast] = useState('');

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  };

  const openTool = (tool) => {
    setCurrentTool(tool);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backHome = () => {
    setCurrentTool(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-shell">
      <Sidebar currentTool={currentTool} isHome={!currentTool} onHome={backHome} onTool={openTool} onTasks={() => setTaskDrawer(true)} notify={notify} />
      {!currentTool && <HomePage onTool={openTool} onTasks={() => setTaskDrawer(true)} notify={notify} />}
      {currentTool && <StandardVideoWorkbench key={currentTool.id} tool={currentTool} onBack={backHome} onTasks={() => setTaskDrawer(true)} notify={notify} />}
      {taskDrawer && <TaskDrawer onClose={() => setTaskDrawer(false)} notify={notify} />}
      {toast && <div className="toast"><Check size={17} weight="bold" />{toast}</div>}
    </div>
  );
}

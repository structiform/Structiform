function ProjectsApp() {
  try {
    return <ProjectsPage />;
  } catch (error) {
    console.error('ProjectsApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProjectsApp />);
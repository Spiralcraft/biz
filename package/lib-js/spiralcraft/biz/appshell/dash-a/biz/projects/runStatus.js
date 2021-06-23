
export default function(project)
{
  return (
      (project.currentRun && project.currentRun.tracker)
      ?project.currentRun.name
      :!project.runs || project.runs.length==0
      ?"Not Tracking"
      :""+project.runs.length+" Completed"
      );
  
};


<script>
  import { onMount, getContext } from 'svelte';
  
  import ProjectForm from "@vfs/app/biz/projects/ProjectForm.svelte";
  import AbstractCRUDRoute from "@vfs/app/components/AbstractCRUDRoute.svelte";

  const title="Project";
  const doneRoute="/projects";

  export let id;
  
  
</script>

<AbstractCRUDRoute
  title={title}
  doneRoute={doneRoute}
  id={id}
  >
  <ProjectForm/>
</AbstractCRUDRoute>



import {targetRef,pipedAccessor} from "@spiralcraft/lang/expressions.js"

export default function(app)
{
  function filterIds(ids,selected)
  {
    if (!selected || selected.length==0)
    { return true;
    }
    else if (!ids)
    { return false;
    }
    else
    { return ids.filter( id => selected.includes(id) ).length>0;
    }
    
  }
  
  const perspective=
  {
    enabled: false,
    enabledChannel: pipedAccessor( targetRef( () => perspective ), "enabled" ),
    selected: [],
    filter: ids => perspective.enabled?filterIds(ids,perspective.selected):true,
  };
  
  
  const mod=
  {
    perspective,
  };
  
  return mod;
}
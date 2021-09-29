export default function(app)
{

  const alerts=
  [ 
    { code:'i', 
      icon: app.icons["infoCircle"],
      colorClass: "text-info",
      color: "#0dcaf0"
    },
    { code: 's',
      icon: app.icons["checkCircle"],
      colorClass: "text-success",
      color: "#198754"
    },
    { code: 'q', 
      icon: app.icons["exclamationTriangle"],
      colorClass: "text-warning",
      color: "#9d0df0"
    },
    { code: 'w', 
      icon: app.icons["exclamationTriangle"],
      colorClass: "text-warning",
      color: "#ffc107"
    },
    { code: 'd', 
      icon: app.icons["exclamationTriangle"],
      colorClass: "text-danger",
      color: "#DC3545"
    },
  ];
  
  function alert(code)
  {
    return alerts.find( a => a.code==code );
  }
  
  const get=alert;
  
  function icon(code)
  {
    let alert=get(code);
    if (alert)
    { return alert.icon;
    }
    else
    { return null;
    }
  }

  function colorClass(code)
  {
    let alert=get(code);
    if (alert)
    { return alert.colorClass;
    }
    else
    { return "";
    }
  }    
  
  function color(code,def)
  {
    let alert=get(code);
    if (alert)
    { return alert.color;
    }
    else
    { return def;
    }
  }    

  const mod=
  {
    alerts,
    alert,
    icon,
    colorClass,
    color,
  };
  
  return mod;
}

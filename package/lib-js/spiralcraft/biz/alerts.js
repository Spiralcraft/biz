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
      icon: app.icons["questionDiamond"],
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

  const priorityOrder = ['d','w','q','i','s'];
    
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

  function compare(code1,code2)
  {
    if (code1==code2)
    { return 0;
    }
    if (!code1)
    { return 1;
    }
    if (!code2)
    { return -1;
    }
    
    return priorityOrder.indexOf(code1)
            -priorityOrder.indexOf(code2);
  }

  function sort(alerts, bins)
  {
    bins=bins || 
      { d:[],
        w:[],
        q:[],
        i:[],
        s:[],
      };
      
    if (alerts && alerts.length>0)
    {
      for (let alert of alerts)
      { bins[alert.code].push(alert);
      }
    }
    return bins;  
  }
  
  function orderByPriority(alerts)
  {
    alerts.sort( (a,b) =>
      {
        let priorityResult = compare(a.code, b.code);
        if (priorityResult!=0)
        { return priorityResult;
        }
        if (a.activatedTime==b.activatedTime)
        { return 0;
        }
        return a.activatedTime<b.activatedTime?1:-1;
      }
    );
    return alerts;
  }
  
  const mod=
  {
    alerts,
    alert,
    icon,
    colorClass,
    color,
    compare,
    sort,
    orderByPriority,
  };
  
  return mod;
}

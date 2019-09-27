import Vue from 'vue'
import Router from 'vue-router'
/* layout */
import Layout from '@/components/layout/Layout'
Vue.use(Router)

/**
* icon : 对应的sidebar icon图标
* hidden : 如果 `hidden:true` 将不显示在siderbar中
* redirect : 重定向
* noDropdown : 如果 `noDropdown:true` 将没有子菜单
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/components/login/index'),
    name: '登陆',
    noDropdown: true,
    hidden: true,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/authredirect',
    component: () => import('@/components/login/authredirect'),
    name: '权限跳转',
    noDropdown: true,
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: '首页',
    icon: 'people',
    noDropdown: true,
    hidden: false,
    children: [
      {
        path: '/index',
        name: '简述',
        noDropdown: true,
        hidden: true,
        meta: {
          title: '首页-简述'
        },
        component: () => import('@/base/index/index')
      }
    ]
  },
  {
    path: '/flow/print',
    component: () => import('@/components/platform/approval-flow/right-fixed/print'),
    name: '流程打印',
    noDropdown: true,
    hidden: true,
    meta: {
      title: '流程打印'
    }
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/employee',
    component: Layout,
    redirect: '/employee/list',
    name: '员工',
    icon: 'employee',
    noDropdown: false,
    hidden: true,
    children: [
      {
        path: 'list',
        component: () => import('@/components/employee/employeeList/employeeList'),
        name: '员工列表',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '员工-员工列表',
          hidden: false
        }
      },
      {
        path: 'organize',
        component: () => import('@/components/employee/organizationManage/organizationManage'),
        name: '组织管理',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '员工-组织管理',
          hidden: false
        }
      },
      {
        path: '/employee/employeeManage',
        redirect: '/employee/employeeManage/index',
        component: () => import('@/components/employee/employeeManage/index'),
        name: '员工管理',
        noDropdown: false,
        hidden: false,
        children: [
          {
            path: 'index',
            component: () => import('@/components/employee/employeeManage/index/index'),
            name: '员工管理',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '员工-员工管理',
              hidden: false
            }
          },
          {
            path: 'employeeEntry',
            component: () => import('@/components/employee/employeeManage/employeeEntry/employeeEntry'),
            name: '员工入职',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '员工-员工入职',
              hidden: false
            }
          },
          {
            path: 'employeeInfoInput',
            component: () => import('@/components/employee/employeeManage/informationInput/informationInput'),
            name: '信息录入',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '员工-信息录入',
              hidden: false
            }
          },
          {
            path: 'employeeSalaryManage',
            component: () => import('@/components/employee/employeeManage/salaryManage/salaryManage'),
            name: '工资管理',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '员工-工资管理',
              hidden: false
            }
          }
        ]
      },
      {
        path: '/employee/contractManage',
        redirect: '/employee/contractManage/index',
        component: () => import('@/components/employee/contractManage/index'),
        name: '合同管理',
        noDropdown: false,
        hidden: false,
        children: [
          {
            path: 'index',
            component: () => import('@/components/employee/contractManage/contractInformation/contractInformation'),
            name: '合同信息',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '合同管理-合同信息',
              hidden: false
            }
          },
          {
            path: 'employeeContractRemind',
            component: () => import('@/components/employee/contractManage/contractRemind/contractRemind'),
            name: '合同提醒',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '合同管理-合同提醒',
              hidden: false
            }
          }
        ]
      },
      {
        path: 'employeeCreateReport',
        component: () => import('@/components/employee/createReport/createReport'),
        name: '生成报告',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '生成报告',
          hidden: false
        }
      },
      {
        path: 'employeeBaseConfig',
        component: () => import('@/components/employee/baseConfig/baseConfig'),
        name: '基础配置',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '基础配置',
          hidden: false
        }
      }
    ]
  },
  {
    path: '/employee',
    component: Layout,
    redirect: '/employee/employeeManage/joinedEmployee',
    name: '员工',
    icon: 'employee',
    noDropdown: false,
    hidden: false,
    meta: {
      title: '员工',
      hidden: false
    },
    children: [
      {
        path: '/employee/employeeManage',
        component: () => import('@/components/employee1/employeeManage/employeeManage'),
        name: '员工管理',
        noDropdown: false,
        hidden: false,
        meta: {
          title: '员工-员工管理',
          hidden: false
        },
        children: [
          {
            path: 'joinedEmployee',
            component: () => import('@/components/employee1/employeeManage/joinedEmployee/joinedEmployee'),
            name: '在职员工',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '员工管理-在职员工',
              hidden: false
            }
          },
          {
            path: 'waitEmployee',
            component: () => import('@/components/employee1/employeeManage/waitEmployee/waitEmployee'),
            name: '待入职员工',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '员工管理-待入职员工',
              hidden: false
            }        
          },
          {
            path: 'leavedEmployee',
            component: () => import('@/components/employee1/employeeManage/leavedEmployee/leavedEmployee'),
            name: '离职员工',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '员工管理-离职员工',
              hidden: false
            }        
          },
          {
            path: 'empDetailInfo',
            component: () => import('@/components/employee1/employeeManage/empDetailInfo'),
            name: '员工详情',
            noDropdown: true,
            hidden: true,
            meta: {
              title: '员工管理-员工详情',
              hidden: false
            }        
          }          
        ]      
      }, 
      {
        path: '/employee/contractManage',
        component: () => import('@/components/employee1/contractManage/contractManage'),
        name: '合同管理',
        noDropdown: false,
        hidden: false,
        meta: {
          title: '员工-合同管理',
          hidden: false
        }, 
        children: [
          {
            path: 'contract',
            component: () => import('@/components/employee1/contractManage/contract/contract'),
            name: '合同管理',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '合同管理-合同管理',
              hidden: false
            }
          },
          {
            path: 'contractRemind',
            component: () => import('@/components/employee1/contractManage/contractRemind/contractRemind'),
            name: '合同提醒',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '合同管理-合同提醒',
              hidden: false
            }
          }          
        ]       
      },
      {
        path: '/employee/eventHandler',
        component: () => import('@/components/employee1/eventHandler/eventHandler'),
        name: '事件处理器',
        noDropdown: false,
        hidden: false,
        meta: {
          title: '员工-事件处理器',
          hidden: false
        }, 
        children: [
          {
            path: 'event',
            component: () => import('@/components/employee1/eventHandler/event/event'),
            name: '事件',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '事件处理器-事件',
              hidden: false
            }
          }, 
          {
            path: 'executeEvent',
            component: () => import('@/components/employee1/eventHandler/executeEvent/executeEvent'),
            name: '执行事件',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '事件处理器-执行事件',
              hidden: false
            }            
          },
          {
            path: 'setEvent',
            component: () => import('@/components/employee1/eventHandler/setEvent/setEvent'),
            name: '设置事件',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '事件处理器-设置事件',
              hidden: false
            }                
          },
          {
            path: 'batchEventsImport',
            component: () => import('@/components/employee1/eventHandler/batchEventsImport/batchEventsImport'),
            name: '批量事件导入',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '事件处理器-批量事件导入',
              hidden: false
            }                
          }                   
        ]        
      },
      {
        path: '/employee/baseSet',
        component: () => import('@/components/employee1/baseSet/baseSet'),
        name: '基础设置',
        noDropdown: false,
        hidden: false,
        meta: {
          title: '员工-基础设置',
          hidden: false
        },   
        children: [
          {
            path:'personnelFile',
            component: () => import('@/components/employee1/baseSet/personnelFile/personnelFile'),
            name:'人事档案地点',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '基础设置-人事档案地点',
              hidden: false
            }
          },
          {
            path:'showGroupSet',
            component: () => import('@/components/employee1/baseSet/showGroupSet/showGroupSet'),
            name:'显示组表配置',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '基础设置-显示组表配置',
              hidden: false
            }            
          },
          {
            path:'fieldAuthority',
            component: () => import('@/components/employee1/baseSet/fieldAuthority/fieldAuthority'),
            name:'组件字段权限',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '基础设置-组件字段权限',
              hidden: false
            }              
          },
          {
            path:'customerDIC',
            component: () => import('@/components/employee1/baseSet/customerDIC/customerDIC'),
            name:'自定义字典表',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '基础设置-自定义字典表',
              hidden: false
            }              
          },
          {
            path:'assignmentRules',
            component: () => import('@/components/employee1/baseSet/assignmentRules/assignmentRules'),
            name:'工号分配规则',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '基础设置-员工号自动分配规则',
              hidden: false
            }                 
          }          
        ]      
      }  
    ]
  },
  {
    path: '/socialSecurity',
    redirect: '/socialSecurity/index',
    component: Layout,
    name: '社保',
    icon: 'socialSecurity',
    noDropdown: true,
    hidden: false,
    children: [
      {
        path: '/socialSecurity/index',
        component: () => import('@/components/socialSecurity/index/fileInformation/fileInformation'),
        name: '档案信息',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '社保-档案信息',
          hidden: false
        }
      },
      {
        path: 'socialThisMonth',
        component: () => import('@/components/socialSecurity/index/thisMonth/thisMonth'),
        name: '本月变动',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '社保-本月变动',
          hidden: false
        }
      },
      {
        path: 'monthlyReport',
        component: () => import('@/components/socialSecurity/index/monthlyReport/monthlyReport'),
        name: '月报',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '社保-月报',
          hidden: false
        }
      },
      {
        path: 'payBack',
        component: () => import('@/components/socialSecurity/index/payBack/payBack'),
        name: '补缴',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '社保-补缴',
          hidden: false
        }
      },
      {
        path: 'insuranceTable',
        component: () => import('@/components/socialSecurity/index/insuranceTable/insuranceTable'),
        name: '参保报表',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '社保-参保报表',
          hidden: false
        }
      },
      {
        path: 'insuranceConfig',
        component: () => import('@/components/socialSecurity/index/insuranceConfig/insuranceConfig'),
        name: '参保配置',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '社保-参保配置',
          hidden: false
        }
      }
    ]
  },
  {
    path: '/salary',
    redirect: '/salary/salaryRule',
    component: Layout,
    name: '薪资',
    icon: 'salary',
    noDropdown: false,
    hidden: false,
    children: [
      {
        path: 'salaryRule',
        component: () => import('@/components/salary/salaryRule/index'),
        name: '薪资规则',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '薪资-薪资规则',
          hidden: false
        },
        children: [
          {
            path: 'addProject',
            component: () => import('@/components/salary/salaryRule/addProject'),
            name: '新增方案',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '薪资-新增方案',
              hidden: false
            }
          },
          {
            path: 'editorProject',
            component: () => import('@/components/salary/salaryRule/addProject'),
            name: '编辑方案',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '薪资-编辑方案',
              hidden: true
            }
          }
        ]
      },
      {
        path: 'salaryProject',
        component: () => import('@/components/salary/salaryProject/index'),
        name: '薪资项目',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '薪资-薪资项目',
          hidden: false
        },
        children: [
          {
            path: 'salaryArchiveInfo',
            component: () => import('@/components/salary/salaryProject/salaryArchiveInfo'),
            name: '薪资项目-个人信息',
            noDropdown: true,
            hidden: true,
            meta: {
              title: '薪资-薪资项目-个人信息',
              hidden: true
            }
          }
        ]
      },
      {
        path: 'salaryScheme',
        component: () => import('@/components/salary/salaryScheme/index'),
        name: '薪资档案',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '薪资-薪资档案',
          hidden: false
        }
      },
      {
        path: 'salaryUpdate',
        component: () => import('@/components/salary/salaryUpdate/index'),
        name: '定薪调薪',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '薪资-定薪调薪',
          hidden: false
        }
      },
      {
        path: 'salaryMonthReport',
        component: () => import('@/components/salary/salaryMonthReport/index'),
        name: '薪资月报',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '薪资-薪资月报',
          hidden: false
        }
      },
      {
        path: 'salaryCommonMonth',
        component: () => import('@/components/salary/salaryCommonMonth/index'),
        name: '普通月发薪',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '薪资-普通月发薪',
          hidden: false
        },
        children: [
          {
            path: 'salaryCMPInfo',
            component: () => import('@/components/salary/salaryCommonMonth/salaryCMPInfo.vue'),
            name: '普通月发薪-个人信息',
            noDropdown: true,
            hidden: true,
            meta: {
              title: '薪资-普通月发薪-个人信息',
              hidden: true
            }
          }
        ]
      },
      {
        path: 'salarySpecial',
        component: () => import('@/components/salary/salarySpecial/index'),
        name: '特殊发薪',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '薪资-特殊发薪',
          hidden: false
        }
      },
      {
        path: 'salaryContrastTable',
        component: () => import('@/components/salary/salaryContrastTable/index'),
        name: '薪酬对比分析表',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '薪资-薪酬对比分析表',
          hidden: false
        }
      },
      {
        path: 'salaryApproval',
        component: () => import('@/components/salary/salaryApproval/index'),
        name: '薪资审批',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '薪资-薪资审批',
          hidden: false
        }
      },
      {
        path: 'salaryProvision',
        component: () => import('@/components/salary/salaryProvision/index'),
        name: '薪资计提',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '薪资-薪资计提',
          hidden: false
        }
      },
      {
        path: 'salaryBillSet',
        component: () => import('@/components/salary/salaryBillSet/index'),
        name: '工资条设定',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '薪资-工资条设定',
          hidden: false
        }
      },
      {
        path: 'salaryAmerceSet',
        component: () => import('@/components/salary/salaryAmerceSet/index'),
        name: '惩奖设定',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '薪资-惩奖设定',
          hidden: false
        }
      },
      {
        path: 'leaveSet',
        component: () => import('@/components/salary/leaveSet/index'),
        name: '请假款项',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '薪资-请假款项',
          hidden: false
        }
      },
      {
        path: 'overtimeSet',
        component: () => import('@/components/salary/overtimeSet/index'),
        name: '加班款项',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '薪资-加班款项',
          hidden: false
        }
      }
    ]
  },
  {
    path: '/attendance',
    redirect: '/attendance/baseConfig',
    component: Layout,
    name: '考勤',
    icon: 'salary',
    noDropdown: false,
    hidden: false,
    children: [
      {
        path: '/attendance/baseConfig',
        redirect: '/attendance/baseConfig/daySet',
        component: () => import('@/components/attendance/base-config/index'),
        name: '基础配置',
        noDropdown: false,
        hidden: false,
        children: [
          {
            path: 'daySet',
            component: () => import('@/components/attendance/base-config/day-set/index'),
            name: '班次设置',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '考勤-班次设置',
              hidden: false
            },
            children: [
              {
                path: 'addDay',
                component: () => import('@/components/attendance/base-config/day-set/detail'),
                name: '新增班次',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '考勤-新增班次',
                  hidden: false
                }
              },
              {
                path: 'editDay',
                component: () => import('@/components/attendance/base-config/day-set/detail'),
                name: '编辑班次',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '考勤-编辑班次',
                  hidden: true
                }
              }
            ]
          },
          {
            path: 'attendanceTeam',
            component: () => import('@/components/attendance/base-config/attendance-team/index'),
            name: '考勤组',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '考勤-考勤组',
              hidden: false
            },
            children: [
              {
                path: 'addAttendanceTeam',
                component: () => import('@/components/attendance/base-config/attendance-team/detail'),
                name: '新增考勤组',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '考勤-新增考勤组',
                  hidden: false
                }
              },
              {
                path: 'editAttendanceTeam',
                component: () => import('@/components/attendance/base-config/attendance-team/detail'),
                name: '新增考勤组',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '考勤-编辑考勤组',
                  hidden: true
                }
              }
            ]
          },
          {
            path: 'attendanceRule',
            component: () => import('@/components/attendance/base-config/attendance-rule/index'),
            name: '出勤规则',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '考勤-出勤规则',
              hidden: false
            },
            children: [
              {
                path: 'overtimeRule',
                component: () => import('@/components/attendance/base-config/attendance-rule/overtime-rule-list'),
                name: '加班规则',
                noDropdown: true,
                hidden: true,
                meta: {
                  title: '加班规则',
                  hidden: true
                },
                children: [
                  {
                    path: 'addOvertimeRule',
                    component: () => import('@/components/attendance/base-config/attendance-rule/overtime-rule-detail'),
                    name: '新增加班规则',
                    noDropdown: true,
                    hidden: true,
                    meta: {
                      title: '新增加班规则',
                      hidden: true
                    }
                  },
                  {
                    path: 'editOvertimeRule',
                    component: () => import('@/components/attendance/base-config/attendance-rule/overtime-rule-detail'),
                    name: '编辑加班规则',
                    noDropdown: true,
                    hidden: true,
                    meta: {
                      title: '编辑加班规则',
                      hidden: true
                    }
                  }
                ]
              },
              {
                path: 'offdayRule',
                component: () => import('@/components/attendance/base-config/attendance-rule/offday-rule-list'),
                name: '调休规则',
                noDropdown: true,
                hidden: true,
                meta: {
                  title: '调休规则',
                  hidden: true
                },
                children: [
                  {
                    path: 'addOffdayRule',
                    component: () => import('@/components/attendance/base-config/attendance-rule/offday-rule-detail'),
                    name: '新增调休规则',
                    noDropdown: true,
                    hidden: true,
                    meta: {
                      title: '新增调休规则',
                      hidden: true
                    }
                  },
                  {
                    path: 'editOffdayRule',
                    component: () => import('@/components/attendance/base-config/attendance-rule/offday-rule-detail'),
                    name: '编辑调休规则',
                    noDropdown: true,
                    hidden: true,
                    meta: {
                      title: '编辑调休规则',
                      hidden: true
                    }
                  }
                ]
              },
              {
                path: 'businessRule',
                component: () => import('@/components/attendance/base-config/attendance-rule/business-rule-list'),
                name: '出差规则',
                noDropdown: true,
                hidden: true,
                meta: {
                  title: '出差规则',
                  hidden: true
                },
                children: [
                  {
                    path: 'addBusinessRule',
                    component: () => import('@/components/attendance/base-config/attendance-rule/business-rule-detail'),
                    name: '新增出差规则',
                    noDropdown: true,
                    hidden: true,
                    meta: {
                      title: '新增出差规则',
                      hidden: true
                    }
                  },
                  {
                    path: 'editBusinessRule',
                    component: () => import('@/components/attendance/base-config/attendance-rule/business-rule-detail'),
                    name: '编辑出差规则',
                    noDropdown: true,
                    hidden: true,
                    meta: {
                      title: '编辑出差规则',
                      hidden: true
                    }
                  }
                ]
              },
              {
                path: 'publicRule',
                component: () => import('@/components/attendance/base-config/attendance-rule/public-rule-list'),
                name: '公出规则',
                noDropdown: true,
                hidden: true,
                meta: {
                  title: '公出规则',
                  hidden: true
                },
                children: [
                  {
                    path: 'addPublicRule',
                    component: () => import('@/components/attendance/base-config/attendance-rule/public-rule-detail'),
                    name: '新增公出规则',
                    noDropdown: true,
                    hidden: true,
                    meta: {
                      title: '新增公出规则',
                      hidden: true
                    }
                  },
                  {
                    path: 'editPublicRule',
                    component: () => import('@/components/attendance/base-config/attendance-rule/public-rule-detail'),
                    name: '编辑公出规则',
                    noDropdown: true,
                    hidden: true,
                    meta: {
                      title: '编辑公出规则',
                      hidden: true
                    }
                  }
                ]
              },
              {
                path: 'supplementRule',
                component: () => import('@/components/attendance/base-config/attendance-rule/supplement-rule-list'),
                name: '补签规则',
                noDropdown: true,
                hidden: true,
                meta: {
                  title: '补签规则',
                  hidden: true
                },
                children: [
                  {
                    path: 'addSupplementRule',
                    component: () => import('@/components/attendance/base-config/attendance-rule/supplement-rule-detail'),
                    name: '新增补签规则',
                    noDropdown: true,
                    hidden: true,
                    meta: {
                      title: '新增补签规则',
                      hidden: true
                    }
                  },
                  {
                    path: 'editSupplementRule',
                    component: () => import('@/components/attendance/base-config/attendance-rule/supplement-rule-detail'),
                    name: '编辑补签规则',
                    noDropdown: true,
                    hidden: true,
                    meta: {
                      title: '编辑补签规则',
                      hidden: true
                    }
                  }
                ]
              },
              {
                path: 'appealRule',
                component: () => import('@/components/attendance/base-config/attendance-rule/appeal-rule-list'),
                name: '申述规则',
                noDropdown: true,
                hidden: true,
                meta: {
                  title: '申述规则',
                  hidden: true
                },
                children: [
                  {
                    path: 'addAppealRule',
                    component: () => import('@/components/attendance/base-config/attendance-rule/appeal-rule-detail'),
                    name: '新增申述规则',
                    noDropdown: true,
                    hidden: true,
                    meta: {
                      title: '新增申述规则',
                      hidden: true
                    }
                  },
                  {
                    path: 'editAppealRule',
                    component: () => import('@/components/attendance/base-config/attendance-rule/appeal-rule-detail'),
                    name: '编辑申述规则',
                    noDropdown: true,
                    hidden: true,
                    meta: {
                      title: '编辑申述规则',
                      hidden: true
                    }
                  }
                ]
              },
              {
                path: 'leaveRule',
                component: () => import('@/components/attendance/base-config/attendance-rule/leave-rule-list'),
                name: '请假规则',
                noDropdown: true,
                hidden: true,
                meta: {
                  title: '请假规则',
                  hidden: true
                },
                children: [
                  {
                    path: 'addLeaveRule',
                    component: () => import('@/components/attendance/base-config/attendance-rule/leave-rule-detail'),
                    name: '新增请假规则',
                    noDropdown: true,
                    hidden: true,
                    meta: {
                      title: '新增请假规则',
                      hidden: true
                    }
                  },
                  {
                    path: 'editLeaveRule',
                    component: () => import('@/components/attendance/base-config/attendance-rule/leave-rule-detail'),
                    name: '编辑请假规则',
                    noDropdown: true,
                    hidden: true,
                    meta: {
                      title: '编辑请假规则',
                      hidden: true
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: '/attendance/handleService',
        redirect: '/attendance/baseConfig/daySet',
        component: () => import('@/components/attendance/handle-service/index'),
        name: '业务处理',
        noDropdown: false,
        hidden: false,
        children: [
          {
            path: 'attendanceArchives',
            component: () => import('@/components/attendance/handle-service/attendance-archives/index'),
            name: '考勤档案',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '考勤-考勤档案',
              hidden: false
            }
          },
          {
            path: 'attendanceTeam',
            component: () => import('@/components/attendance/handle-service/scheduling/index'),
            name: '排班表',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '考勤-排班表',
              hidden: false
            },
            children: [
              {
                path: 'schedulingCount',
                component: () => import('@/components/attendance/handle-service/scheduling/scheduling-count'),
                name: '排班统计',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '考勤-排班统计',
                  hidden: false
                }
              },
              {
                path: 'schedulingBatch',
                component: () => import('@/components/attendance/handle-service/scheduling/scheduling-batch'),
                name: '批量排班',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '考勤-批量排班',
                  hidden: true
                }
              },
              {
                path: 'schedulingHighBatch',
                component: () => import('@/components/attendance/handle-service/scheduling/scheduling-high-batch'),
                name: '高级批量排班',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '考勤-高级批量排班',
                  hidden: true
                }
              },
              {
                path: 'schedulingImport',
                component: () => import('@/components/attendance/handle-service/scheduling/scheduling-import'),
                name: '导入排班',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '考勤-导入排班',
                  hidden: true
                }
              }
            ]
          }
        ]
      },
      {
        path: '/attendance/handleData',
        redirect: '/attendance/handleData/clockRecord',
        component: () => import('@/components/attendance/handle-data/index'),
        name: '数据处理',
        noDropdown: false,
        hidden: false,
        children: [
          {
            path: 'clockRecord',
            component: () => import('@/components/attendance/handle-data/clock-record/index'),
            name: '打卡记录',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '考勤-打卡记录',
              hidden: false
            }
          },
          {
            path: 'supplementRecord',
            component: () => import('@/components/attendance/handle-data/supplement-record/index'),
            name: '补签单据',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '考勤-补签单据',
              hidden: false
            }
          },
          {
            path: 'attendanceAppeal',
            component: () => import('@/components/attendance/handle-data/attendance-appeal/index'),
            name: '考勤申诉',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '考勤-考勤申诉',
              hidden: false
            }
          },
          {
            path: 'timeReceipt',
            component: () => import('@/components/attendance/handle-data/time-receipt/index'),
            name: '时间单据',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '考勤-时间单据',
              hidden: false
            }
          },
          {
            path: 'overtimeReceipt',
            component: () => import('@/components/attendance/handle-data/overtime-receipt/index'),
            name: '加班单据',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '考勤-加班单据',
              hidden: false
            }
          }
        ]
      },
      {
        path: '/attendance/attendanceReport',
        redirect: '/attendance/attendanceReport/attendanceDayReport',
        component: () => import('@/components/attendance/attendance-report/index'),
        name: '考勤报告',
        noDropdown: false,
        hidden: false,
        children: [
          {
            path: 'attendanceDayReport',
            component: () => import('@/components/attendance/attendance-report/attendance-day-report/index'),
            name: '考勤日报',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '考勤-考勤日报',
              hidden: false
            }
          },
          {
            path: 'attendanceMonthReport',
            component: () => import('@/components/attendance/attendance-report/attendance-month-report/index'),
            name: '考勤月报',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '考勤-考勤月报',
              hidden: false
            }
          },
          {
            path: 'overtimeCount',
            component: () => import('@/components/attendance/attendance-report/overtime-count/index'),
            name: '加班统计',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '考勤-加班统计',
              hidden: false
            }
          },
          {
            path: 'workingHoursMonthReport',
            component: () => import('@/components/attendance/attendance-report/working-hours-month-report/index'),
            name: '工时月报',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '考勤-工时月报',
              hidden: false
            }
          }
        ]
      }
    ]
  },
  {
    path: '/platform',
    redirect: '/platform/index',
    component: Layout,
    name: '平台',
    icon: 'platform',
    noDropdown: false,
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/components/platform/socialManage/joinType/joinType'),
        name: '参保类型',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '平台-参保类型',
          hidden: false
        }
      },
      {
        path: 'platformThisMonth',
        component: () => import('@/components/platform/socialManage/thisMonth/thisMonth'),
        name: '本月变动',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '平台-本月变动',
          hidden: false
        }
      },
      {
        path: '/platform/approvalFlow',       // 审批流 一级菜单
        redirect: '/platform/approvalFlow/flowInfo', // 重定向到 二级菜单审批流路由
        component: () => import('@/components/platform/approval-flow/index'),
        name: '审批流',
        noDropdown: false,
        hidden: false,
        children: [
          {
            path: 'tableManage',
            component: () => import('@/components/platform/approval-flow/table-manage/table-manage'),
            name: '表单管理',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '表单管理',
              hidden: false
            },
            children: [
              {
                path: 'showTable',   // 点击 查看按钮  查看表单信息
                component: () => import('@/components/platform/approval-flow/table-manage/table-show'),
                name: '表单信息',
                noDropdown: true,
                hidden: true,
                meta: {
                  title: '表单信息',
                  hidden: false
                }
              },
              {
                path: 'tableEdit', // 点击 编辑 按钮，进入表单的编辑界面
                component: () => import('@/components/platform/approval-flow/table-manage/table-edit'),
                name: '表单编辑',
                noDropdown: true,
                hidden: true,
                meta: {
                  title: '表单编辑',
                  hidden: true
                }
              }
            ]
          },
          {
            path: 'flowInfo',   // 审批流—— 审批流信息 菜单
            component: () => import('@/components/platform/approval-flow/flow-info/flow-info'),
            name: '审批流信息',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '审批流信息',
              hidden: false
            }
          },
          {
            path: 'flowRule',  // 审批流——审批规则二级菜单路由
            component: () => import('@/components/platform/approval-flow/flow-rule/flow-rule'),
            name: '审批规则',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '审批规则',
              hidden: false
            },
            children: [
              {
                path: 'flowConfig',  //  查看/新增/编辑 流程时 的流程配置页面  
                component: () => import('@/components/platform/approval-flow/flow-config/index'),
                redirect: '/platform/approvalFlow/flowRule/flowConfig/processSet',  // 查看、新增和编辑时，重定向到了 processSet子路由页面
                name: '审批流配置',
                noDropdown: true,
                hidden: true,
                meta: {
                  title: '审批流配置',
                  hidden: true
                },
                children: [
                  {
                    path: 'processSet',   // 流程设置路由页面
                    component: () => import('@/components/platform/approval-flow/flow-config/process-set/process-set'),
                    name: '流程设置',
                    noDropdown: true,
                    hidden: true,
                    meta: {
                      title: '流程设置',
                      hidden: true
                    }
                  },
                  {
                    path: 'relationTable',  // 流程表单页面
                    component: () => import('@/components/platform/approval-flow/flow-config/relation-table/relation-table'),
                    name: '流程表单',
                    noDropdown: true,
                    hidden: true,
                    meta: {
                      title: '流程表单',
                      hidden: true
                    }
                  },
                  {
                    path: 'processDesign',  // 流程设计页面
                    component: () => import('@/components/platform/approval-flow/flow-config/process-design/process-design'),
                    name: '流程设计',
                    noDropdown: true,
                    hidden: true,
                    meta: {
                      title: '流程设计',
                      hidden: true
                    }
                  },
                  {
                    path: 'fieldSet',   // 节点设置页面
                    component: () => import('@/components/platform/approval-flow/flow-config/field-set/field-set'),
                    name: '节点设置',
                    noDropdown: true,
                    hidden: true,
                    meta: {
                      title: '节点设置',
                      hidden: true
                    }
                  }
                ]
              }
            ]
          },
          {
            path: 'launch',  // 审批流——发起 二级菜单路由
            component: () => import('@/components/platform/approval-flow/launch/launch'),
            name: '发起',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '平台-发起',
              hidden: false
            }
          },
          {
            path: 'todo',   // 审批流—— 待办  二级菜单路由
            component: () => import('@/components/platform/approval-flow/todo/todo'),
            name: '待办',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '平台-待办',
              hidden: false
            }
          },
          {
            path: 'onTheWay',  // 审批流——在途 二级菜单路由
            component: () => import('@/components/platform/approval-flow/on-the-way/on-the-way'),
            name: '在途',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '平台-在途',
              hidden: false
            }
          },
          {
            path: 'myStart',   // 审批流——我发起的 二级路由页面
            component: () => import('@/components/platform/approval-flow/my-start/my-start'),
            name: '我发起的',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '平台-我发起的',
              hidden: false
            }
          },
          {
            path: 'myApproval',   // 审批流 —— 我审批的  二级路由页面
            component: () => import('@/components/platform/approval-flow/my-approval/my-approval'),
            name: '我处理的',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '平台-我处理的',
              hidden: false
            }
          },
          {
            path: 'copyWithMe',   // 审批流—— 抄送我的 二级路由页面
            component: () => import('@/components/platform/approval-flow/copy-with-me/copy-with-me'),
            name: '抄送我的',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '平台-抄送我的',
              hidden: false
            }
          },
          {
            path: 'myFollow',    // 审批流——我关注的  二级路由页面
            component: () => import('@/components/platform/approval-flow/my-follow/my-follow'),
            name: '我关注的',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '平台-我关注的',
              hidden: false
            }
          },
          {
            path: 'set',  // 审批流——设置   二级路由页面
            component: () => import('@/components/platform/approval-flow/set/set'),
            name: "设置",
            noDropdown: true,
            hidden: false,
            meta: {
              title: "设置",
              hidden: false
            }
          }
        ]
      }
    ]
  },
  {
    path: '/notice',    //  通知公告 一级菜单路由 页面
    redirect: '/notice/index',
    component: Layout,
    name: '公告',
    icon: 'notice',
    noDropdown: false,
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/components/notice/front/index'),
        name: '公告首页',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '公告管理',
          hidden: false
        },
        children: [
          {
            path: 'noticeDetailFront',
            component: () => import('@/components/notice/front/noticeDetailFront'),
            name: '员工公告详情',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '公告管理-员工公告详情',
              hidden: true
            }
          }
        ]
      },
      {
        path: 'noticeManage',
        component: () => import('@/components/notice/end/index'),
        name: '公告管理',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '公告管理'
        },
        children: [
          {
            path: 'createNotice',
            component: () => import('@/components/notice/end/createNotice'),
            name: '新建公告',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '公告管理-新建公告',
              hidden: false
            }
          },
          {
            path: 'noticeDetailEnd',
            component: () => import('@/components/notice/end/noticeDetailEnd'),
            name: '公告详情',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '公告管理-公告详情',
              hidden: true
            }
          },
          {
            path: 'modifyNotice',
            component: () => import('@/components/notice/end/modifyNotice'),
            name: '编辑公告',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '公告管理-编辑公告',
              hidden: true
            }
          },
          {
            path: 'feedback',
            component: () => import('@/components/notice/end/feedback'),
            name: '公告反馈',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '公告管理-公告反馈',
              hidden: true
            }
          },
          {
            path: 'historyNotice',
            component: () => import('@/components/notice/end/historyNotice'),
            name: '公告历史',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '公告管理-公告历史',
              hidden: true
            }
          }
        ]
      },
      {
        path: 'receipt',
        component: () => import('@/components/notice/end/receipt'),
        name: '公告回执',
        noDropdown: true,
        hidden: false,
        meta: {
          title: '公告回执',
          hidden: false
        }
      }
    ]
  },
  {
    path: '/manage',
    redirect: '/manage/platformSystemSetting',
    component: Layout,
    name: '管理',
    icon: 'manage',
    noDropdown: false,
    hidden: false,
    children: [
      {
        path: '/manage/platformSystemSetting',
        component: () => import('@/components/manage/userManage/userManage'),
        name: '平台系统设置',
        noDropdown: false,
        hidden: false,
        meta: {
          title: '管理-平台系统设置',
          hidden: false     
        },
        children: [
          {
            path: '/manage/platformSystemSetting/systemSetting',
            // redirect: '/manage/platformSystemSetting/systemSetting/menuManage', // 重定向到 二级菜单 平台系统设置
            component: () => import('@/components/manage/userManage/systemSetting/systemSetting'),
            name: '系统配置',
            noDropdown: false,
            hidden: false,
            meta: {
              title: '平台系统设置-系统配置',
              hidden: false
            },
            children: [
              {
                path: 'menuManage',
                component: () => import('@/components/manage/userManage/systemSetting/menuManage/menuManage'),
                name: '菜单管理',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '系统配置-菜单管理',
                  hidden: false
                }
              },
              {
                path: 'pageManage',
                component: () => import('@/components/manage/userManage/systemSetting/pageManage/pageManage'),
                name: '页面管理',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '系统配置-页面管理',
                  hidden: false
                }                
              },
              {
                path: 'componentsManage',
                component: () => import('@/components/manage/userManage/systemSetting/componentsManage/componentsManage'),
                name: '组件管理',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '系统配置-组件管理',
                  hidden: false
                }                
              },              
            ]
          },
          {
            path: '/manage/platformSystemSetting/userRole',
            component: () => import('@/components/manage/userManage/userRole/userRole'),
            name: '用户角色',
            noDropdown: false,
            hidden: false,
            meta: {
              title: '平台系统设置-用户角色',
              hidden: false    
            },
            children: [
              {
                path: 'account',
                component: () => import('@/components/manage/userManage/userRole/account/account'),
                name: '账户',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '用户角色-账户',
                  hidden: false
                }                
              },
              {
                path: 'sysManager',
                component: () => import('@/components/manage/userManage/userRole/sysManager/sysManager'),
                name: '企业系统管理员',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '用户角色-系统管理员',
                  hidden: false
                }
              },
              {
                path: 'userGroup',
                component: () => import('@/components/manage/userManage/userRole/userGroup/userGroup'), 
                name: '用户组',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '用户角色-用户组',
                  hidden: false   
                }             
              },
              {
                path: 'roleGroup',
                component: () => import('@/components/manage/userManage/userRole/roleGroup/roleGroup'),
                name: '角色组',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '用户角色-角色组',
                  hidden: false 
                }               
              },
              {
                path: 'authorityList',
                component: () => import('@/components/manage/userManage/userRole/authorityList/authorityList'),
                name: '权限引用列表',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '用户角色-权限引用列表',
                  hidden: false    
                }            
              },
              {
                path: 'userManage',
                component: () => import('@/components/manage/userManage/userRole/userManage/userManage'),
                name: '用户管理',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '用户角色-用户管理',
                  hidden: false 
                }               
              },
              {
                path: 'roleManage',
                component: () => import('@/components/manage/userManage/userRole/roleManage/roleManage'),
                name: '角色管理',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '用户角色-角色管理',
                  hidden: false 
                }               
              }
            ]  
          },
          {
            path: '/manage/platformSystemSetting/licensingRights',
            component: () => import('@/components/manage/userManage/licensingRights/licensingRights'),
            name: '许可权',
            noDropdown: false,
            hidden: false,
            meta: {
              title: '平台系统设置-许可权',
              hidden: false
            },
            children: [
              {
                path: 'permit',
                component: () => import('@/components/manage/userManage/licensingRights/permit/permit'),
                name: '许可权',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '许可权-许可权',
                  hidden: false
                }                
              }
            ]
          },
          {
            path: '/manage/platformSystemSetting/versionPackage',
            component: () => import('@/components/manage/userManage/versionPackage/versionPackage'),
            name: '版本套包',
            noDropdown: false,
            hidden: false,
            meta: {
              title: '平台系统设置-版本套包',
              hidden: false
            },
            children: [
              {
                path: 'setting',
                component: () => import('@/components/manage/userManage/versionPackage/setting/setting'),
                name: '设置',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '版本套包-设置',
                  hidden: false
                } 
              },
              {
                path: 'buyDiscount',
                component: () => import('@/components/manage/userManage/versionPackage/buyDiscount/buyDiscount'),
                name: '统一购买折扣',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '版本套包-统一购买折扣',
                  hidden: false
                }                 
              },
              {
                path: 'version',
                component: () => import('@/components/manage/userManage/versionPackage/version/version'),
                name: '版本',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '版本套包-版本',
                  hidden: false
                }                 
              },
              {
                path: 'package',
                component: () => import('@/components/manage/userManage/versionPackage/package/package'),
                name: '套包',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '版本套包-套包',
                  hidden: false
                }                 
              },
              {
                path: 'customerVersion',
                component: () => import('@/components/manage/userManage/versionPackage/customerVersion/customerVersion'),
                name: '客户版本',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '版本套包-客户版本',
                  hidden: false
                }              
              }
            ]
          },
          {
            path: 'companyInfo',
            component: () => import('@/components/manage/userManage/userManage'),
            name: '企业信息',
            noDropdown: true,
            hidden: false,
            meta: {
              title: '平台系统设置-企业信息',
              hidden: false
            }
          }                      
        ]
      },
      {
        path: '/manage/companySetting',
        component: () => import('@/components/manage/companySetting/companySetting'),
        name: '企业',
        noDropdown: false,
        hidden: false,
        meta: {
          title: '管理-企业系统设置',
          hidden: false     
        },
        children: [
          {
            path: '/manage/companySetting/systemSetting',
            component: () => import('@/components/manage/companySetting/systemSetting/systemSetting'),
            name: '系统设置',
            noDropdown: false,
            hidden: false,
            meta: {
              title: '企业-系统设置',
              hidden: false
            },
            children: [
              {
                path: 'dataBase',
                component: () => import('@/components/manage/companySetting/systemSetting/dataBase/dataBase'),
                name: '数据库表',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '数据库表-表配置',
                  hidden: false
                }                
              },
              {
                path: 'displayGroup',
                component: () => import('@/components/manage/companySetting/systemSetting/displayGroup/displayGroup'),
                name: '显示组表',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '显示组表-表配置',
                  hidden: false
                }                 
              },
              {
                path: 'components',
                component: () => import('@/components/manage/companySetting/systemSetting/components/components'),
                name: '显示组件',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '显示组件-组件配置',
                  hidden: false
                }                 
              }
            ]           
          },
          {
            path: '/manage/companySetting/sysRightsSetting',
            component: () => import('@/components/manage/companySetting/sysRightsSetting/sysRightsSetting'),
            name: '系统权限',
            noDropdown: false,
            hidden: false,
            meta: {
              title: '企业-系统设置',
              hidden: false
            },
            children: [
              {
                path: 'companyInfo',
                component: () => import('@/components/manage/companySetting/sysRightsSetting/companyInfo/companyInfo'),
                name: '企业信息',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '系统权限-企业信息',
                  hidden: false
                }
              },
              {
                path: 'companyRole',
                component: () => import('@/components/manage/companySetting/sysRightsSetting/companyRole/companyRole'),
                name: '企业角色',
                noDropdown: true,
                hidden: false,
                meta: {
                  title: '系统权限-企业角色',
                  hidden: false
                }                
              }
            ]           
          }
        ]  
      }   
    ]
  },
  {
    path: '*',
    redirect: '/404',
    // component: () => import('@/components/platform/approval-flow/table-manage/table-show'),
    name: '404',
    noDropdown: true,
    hidden: true
  }
]

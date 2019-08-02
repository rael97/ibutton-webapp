import { AuthLayout, DefaultLayout } from "@/components/layouts"

export const publicRoute = [
  { path: "*", component: () => import(/* webpackChunkName: "errors-404" */ "@/views/error/NotFound.vue") },
  {
    path: "/auth",
    component: AuthLayout,
    meta: { title: "Login" },
    redirect: "/auth/login",
    hidden: true,
    children: [
      {
        path: "login",
        name: "login",
        meta: { title: "Login" },
        component: () => import(/* webpackChunkName: "login" */ "@/views/auth/Login.vue")
      }
    ]
  },

  {
    path: "/404",
    name: "404",
    meta: { title: "Not Found" },
    component: () => import(/* webpackChunkName: "errors-404" */ "@/views/error/NotFound.vue")
  },

  {
    path: "/500",
    name: "500",
    meta: { title: "Server Error" },
    component: () => import(/* webpackChunkName: "errors-500" */ "@/views/error/Error.vue")
  }
]

export const protectedRoute = [
  {
    path: "/",
    component: DefaultLayout,
    meta: { title: "Home", group: "apps", icon: "" },
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        meta: { title: "Home", group: "apps", icon: "dashboard" },
        component: () => import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue")
      },
      {
        path: "/buttons",
        name: "buttons",
        meta: { title: "Buttons", group: "apps", icon: "dashboard" },
        component: () => import(/* webpackChunkName: "dashboard" */ "@/views/buttons/button.vue")
      },
      {
        path: "/403",
        name: "Forbidden",
        meta: { title: "Access Denied", hiddenInMenu: true },
        component: () => import(/* webpackChunkName: "error-403" */ "@/views/error/Deny.vue")
      }
    ]
  }

  // chat app
  // {
  //   path: "/chat",
  //   name: "Chat",
  //   component: ChatLayout,
  //   redirect: {
  //     path: "/chat/messaging"
  //   },
  //   meta: { title: "Chat", group: "apps", icon: "chat_bubble" },
  //   children: [
  //     {
  //       path: "/chat/messaging/:uuid?",
  //       name: "ChatMessaging",
  //       props: true,
  //       components: () => import(/* webpackChunkName: "chat-messaging" */ `@/components/chat/ChatMessaging.vue`)
  //     },
  //     {
  //       path: "/chat/contact/:uuid?",
  //       meta: {
  //         public: true
  //       },
  //       name: "ChatContact",
  //       components: () => import(/* webpackChunkName: "chat-contact" */ `@/components/chat/ChatContact.vue`)
  //     }
  //   ]
  // }
]

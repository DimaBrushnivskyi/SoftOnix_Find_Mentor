import { createRouter, createWebHistory } from "vue-router";

import MentorDetails from "../pages/mentors/MentorDetails.vue";
import MentorRegistration from "../pages/mentors/MentorRegistration.vue";
import MentorsList from "../pages/mentors/MentorsList";
import ContactMentor from "../pages/requests/ContactMentor.vue";
import RecievedRequest from "../pages/requests/RecievedRequest.vue";
import UserAuth from "../pages/auth/UserAuth.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import store from "../store/index.js";

const routes = [
  {
    path: "/",
    redirect: "/mentors",
  },
  {
    path: "/mentors",
    component: MentorsList,
  },
  {
    path: "/SoftOnix_Find_Mentor/",
    name: "MentorsList",
    component: MentorsList,
  },
  {
    path: "/SoftOnix_Find_Mentor/:queryParams(.*)",
    name: "MentorsList",
    component: MentorsList,
    props: true,
  },
  {
    path: "/mentors/:id",
    component: MentorDetails,
    props: true,
    children: [{ path: "contact", component: ContactMentor }],
  },
  {
    path: "/register",
    component: MentorRegistration,
    meta: { needsAuthentication: true },
  },
  {
    path: "/requests",
    component: RecievedRequest,
    meta: { needsAuthentication: true },
  },
  {
    path: "/auth",
    component: UserAuth,
    meta: { needsUnAuthentication: true },
  },
  {
    path: "/:notFoundPage(.*)",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(function (to, _, next) {
  if (to.meta.needsAuthentication && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.needsUnAuthentication && store.getters.isAuthenticated) {
    next("/mentors");
  } else {
    next();
  }
});

export default router;

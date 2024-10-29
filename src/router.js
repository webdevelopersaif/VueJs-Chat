import { createRouter, createWebHistory } from 'vue-router';
import ChatBox from './components/ChatBox.vue'; // Adjust the path to your ChatBox component
import UserLogin from './components/UserLogin.vue'; // Add this for the login component

const routes = [
  {
    path: '/', // Route for login page
    name: 'UserLogin',
    component: UserLogin, 
  },
  {
    path: '/ChatBox/:userId', // Dynamic route for chat with a specific user
    name: 'ChatBox',
    component: ChatBox,
    props: true, // Pass the route params as props
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

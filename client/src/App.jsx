import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {
  ErrorPage,
  HomeLayout,
  InstructorChatPage,
  LandingPage,
  HomeStatsPage,
  WorkoutListPage,
  RecipeListPage,
  RoutineListPage,
  FoodListPage,
  FoodDisplayPage,
  WorkoutDisplayPage,
  DailyLogPage,
  RegisterPage,
  LoginPage,
  DashboardLayout,
  AdminPage,
  AddWorkoutPage,
  AddFoodPage, 
  RoutineDisplayPage,
  RecipeDisplayPage,
  FitnessNewsPage

} from './Pages'

import { action as registerAction } from './Components/RegisterComponent/RegisterComponent'
import { action as loginAction } from './Components/LoginComponent/LoginComponent'
import { loader as profileLoader } from './Components/HomeStatsComponent/HomeStatsComponent'
import { action as addFoodAction } from './Components/AddFoodComponent/AddFoodComponent'
import { action as addWorkoutAction } from './Components/AddWorkoutComponent/AddWorkoutComponent'
import { action as addRoutineAction } from './Components/RoutineListComponent/RoutineListComponent'
import { loader as allRoutineLoader } from './Components/WorkoutDisplayComponent/WorkoutDisplayComponent'
import { action as addRecipeAction } from './Components/RecipeListComponent/RecipeListComponent'
import { loader as allRecipeLoader } from './Components/FoodDisplayComponent/FoodDisplayComponent'
import { loader as checkUserLoader } from './Components/LoginComponent/LoginComponent'
import { action as updateUserAction } from './Components/UserSettingsComponent/UserSettingsComponent'
import UserSettingsPage from './Pages/UserSettingsPage'





const router = createBrowserRouter([
  {
    path:"/",
    element:<HomeLayout/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        index:true,
        element:<LandingPage/>

      },
      {
        path:"register",
        element: <RegisterPage/>,
        action: registerAction
        

      },
      {
        path:"login",
        element:<LoginPage/>,
        action: loginAction,
        loader: checkUserLoader

      },
      {
        path:"home",
        element:<DashboardLayout/>,
        loader: profileLoader,
        children:[
          {
            index:true,
            element: <HomeStatsPage/>,
            loader: profileLoader,
          },
          {
            path: "virtual-instructor",
            element:<InstructorChatPage/>
          },
          {
            path: "workout-list",
            element:<WorkoutListPage/>

          },
          {
            path:"recipe-list",
            element:<RecipeListPage/>,
            action: addRecipeAction
          },
          {
            path: "recipe/:recipeId",
            element: <RecipeDisplayPage/>,

          },
          {
            path:"routine-list",
            element:<RoutineListPage/>,
            action: addRoutineAction
          },
          {
            path:"routine/:routineId",
            element: <RoutineDisplayPage/>,
   
          },
          {
            path:"food-list",
            element:<FoodListPage/>

          },
          {
            path: "food/:foodId",
            element:<FoodDisplayPage/>,
            loader: allRecipeLoader
          },
          {
            path: "workout/:workoutId",
            element:<WorkoutDisplayPage/>,
            loader: allRoutineLoader

          },
          {
            path:"daily-log",
            element:<DailyLogPage/>,
            loader: profileLoader,
          },
          {
            path: "fitness-news",
            element: <FitnessNewsPage/>
          },
          {
            path: "user-settings",
            element:<UserSettingsPage/>,
            action: updateUserAction
          },
          {
            path:"admin",
            children:[
              {
                index: true,
                element: <AdminPage/>
              },
              {
                path: "all-workout"
              },
              {
                path:"all-food"
              },
              {
                path:"add-workout",
                element:<AddWorkoutPage/>,
                action: addWorkoutAction
              },
              {
                path:"add-food",
                element: <AddFoodPage/>,
                action: addFoodAction
              },
              {
                path:"edit-workout/:workoutId"
              },
              {
                path:"edit-food/:foodId"
              }
            ]
          }
        ]
      },

    ]

  }

]);


const App = () => {
  return (
    <RouterProvider router = { router }/>
  )
}

export default App

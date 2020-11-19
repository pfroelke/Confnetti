from django.urls import path, include

urlpatterns = [
    path("auth/", include(("confnetti.authentication.urls", "authentication"))),
    # path('common/', include(('confnetti.common.urls', 'common')))
    path("tasks/", include(("confnetti.tasks.urls", "tasks"))),
    path("ansible-tasks/", include(("confnetti.ansibleTasks.urls", "ansible-tasks"))),
]
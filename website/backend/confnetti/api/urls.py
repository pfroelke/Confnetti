from django.urls import path, include

urlpatterns = [
    path(
        'auth/', include(('confnetti.authentication.urls', 'authentication'))
    ),
    #path('common/', include(('confnetti.common.urls', 'common')))
]
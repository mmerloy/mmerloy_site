from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render, redirect
from .models import News
from .forms import NewsForm
from .forms import NewUserForm
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages


def news(request):
    news = News.objects.all()
    return render(request, 'main/news.html', {'title': 'Новости', 'news': news})


def about(request):
    return render(request, 'main/about.html')


def index(request):
    return render(request, 'main/index.html')


def registration(request):
    return render(request, 'main/registration.html')


def create_news(request):
    error = ''
    print('good')
    if request.method == 'POST':
        form = NewsForm(request.POST)
        if form.is_valid():
            form.save()
            # response = HttpResponse()
            # response.status_code = 200
            # return response
            return redirect('news')
            # data = {'txt': 'Success!'}
            # return JsonResponse(data)
        else:
            error = 'Форма была неверной'
    form = NewsForm()
    context = {
        'form': form,
        'error': error
    }
    return render(request, 'main/create_news.html', context)

# Логин и пароль
# mmerloy_123
# wawa12345


def register_request(request):
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Registration successful.")
            return redirect("/news")
        messages.error(request, "Unsuccessful registration. Invalid information.")
    form = NewUserForm()
    return render(request=request, template_name="main/register.html", context={"register_form": form})


def login_request(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.info(request, "You are now logged in as {username}.")
                return redirect("/news")
            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
    form = AuthenticationForm()
    return render(request=request, template_name="main/login.html", context={"login_form": form})


def logout_request(request):
    logout(request)
    messages.info(request, "You have successfully logged out.")
    return redirect('/news')

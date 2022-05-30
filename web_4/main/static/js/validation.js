document.addEventListener('DOMContentLoaded', function ()
{
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);
  async function formSend(e)
  {

    e.preventDefault();
    removeValidation ()
    var error = formValidate(form);
    if (error == 0)
    {
       alert('Все отлично , вы молодец!');
    }
    else
    {
      alert('Заполните верно обязательные поля');
    }
  }

  function formValidate(form)
  {
    var error = 0;

    let formReq = document.querySelectorAll('[class *= "_req"]');

    for (let index = 0; index < formReq.length; index++)
      {
        const input = formReq[index];


        if (input.classList.contains('form_input_req_email'))
          {
            if (emailTest(input))
            {
              formAddError(input);
               var error = generateError('Error.The email cannot consist of such characters')
              form[index].parentElement.insertBefore(error, formReq[index])
              error ++;


            }
          }

        if (input.classList.contains('form_input_req_fio') )
          {
            if (fioTest(input))
            {
              formAddError(input);
              var error = generateError('Error.FIO cannot consist of such characters')
              form[index].parentElement.insertBefore(error, formReq[index])
              error ++;
            }
          }

        if (input.classList.contains('form_input_req_password'))
          {
            if (passwordTest(input))
            {
              formAddError(input);
              var error = generateError('Error.The password cannot consist of such characters')
              form[index].parentElement.insertBefore(error, formReq[index])
              error ++;
            }
          }
        else
        {
          if (input.value === '')
            {
              formAddError (input);
              var error = generateError('Can not blank')
              form[index].parentElement.insertBefore(error, formReq[index])
              error ++;
            }
        }
      }
    return error;
  }



  function formAddError(input)
  {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  function emailTest(input)
  {
    return !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.value);
  }

  function fioTest(input)
  {
    return /[0-9]+/i.test(input.value);
  }

   function passwordTest(input)
  {
    return !/[0-9a-z]+/i.test(input.value);
  }

  var generateError = function (text)
{
  var error = document.createElement('div')
  error.className = 'error'
  error.style.color = 'red'
  error.innerHTML = text
  return error
}

var removeValidation = function ()
{
  var errors = form.querySelectorAll('.error')
  for (var i = 0; i < errors.length; i++)
  {
    errors[i].remove()
  }
}

})

var obj = {
  section: 'section',
  content: [
    {
      name: 'first'
    },
    {
      name: 'last'
    }
  ]
}
window.onload = function() {
  var html = formBuilder.render(obj);
  console.log(html);
  var view = document.getElementById('preview');
  view.innerHTML = html;
  test("only one section", function() {
    ok(view.childNodes.length === 1, "Passed!");
  });
  test("form builder", function() {
    ok(typeof(html) == 'string', "Passed!");
  });
}


describe('validators.email', function() {
  var email = validate.validators.email;
  email = email.bind(email);

  it("allows non defined values", function() {
    expect(email(null, {})).not.toBeDefined();
    expect(email(undefined, {})).not.toBeDefined();
  });

  it("doesn't allow non strings", function() {
    expect(email(3.14, {})).toBeDefined();
    expect(email(true, {})).toBeDefined();
  });

  it("allows valid emails", function() {
    expect(email('nicklas@ansman.se', {})).not.toBeDefined();
    // Source: https://en.wikipedia.org/wiki/Email_address#Valid_email_addresses
    expect(email('niceandsimple@example.com', {})).not.toBeDefined();
    expect(email('very.common@example.com', {})).not.toBeDefined();
    expect(email('a.little.lengthy.but.fine@dept.example.com', {})).not.toBeDefined();
    expect(email('disposable.style.email.with+symbol@example.com', {})).not.toBeDefined();
    expect(email('other.email-with-dash@example.com', {})).not.toBeDefined();
    expect(email('üñîçøðé@example.com', {})).not.toBeDefined();
  });

  it("doesn't allow invalid emails", function() {
    var expected = "is not a valid email";
    expect(email("foobar", {})).toEqual(expected);
    expect(email("foo@bar", {})).toEqual(expected);

    // Source: https://en.wikipedia.org/wiki/Email_address#Invalid_email_addresses
    expect(email('Abc.example.com', {})).toEqual(expected);
    expect(email('A@b@c@example.com', {})).toEqual(expected);
    expect(email('a"b(c)d,e:f;g<h>i[j\\k]l@example.com', {})).toEqual(expected);
    expect(email('just"not"right@example.com', {})).toEqual(expected);
    expect(email('this is"not\\allowed@example.com', {})).toEqual(expected);
    expect(email('this\\ still\\"not\\\\allowed@example.com', {})).toEqual(expected);
  });

  it("allows you to customize the error message", function() {
    var options = {message: "is totally not an email"};
    expect(email("foobar", options)).toEqual("is totally not an email");
  });
});

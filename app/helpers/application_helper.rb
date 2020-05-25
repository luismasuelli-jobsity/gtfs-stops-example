module ApplicationHelper

  JS_ESCAPE_MAP = {
      '\\'   => '\\\\',
      '<'    => '\\u003c',
      '&'    => '\\u0026',
      '>'    => '\\u003e',
      "\r\n" => '\n',
      "\n"   => '\n',
      "\r"   => '\n',
      '"'    => '\\u0022',
      "'"    => "\\u0027"
  }

  JS_ESCAPE_MAP["\342\200\250".force_encoding(Encoding::UTF_8).encode!] = '&#x2028;'
  JS_ESCAPE_MAP["\342\200\251".force_encoding(Encoding::UTF_8).encode!] = '&#x2029;'

  def escape_javascript_with_inside_html(javascript)
    if javascript
      result = javascript.gsub(/(\\|\r\n|\342\200\250|\342\200\251|[\n\r<>&"'])/u) {|match| JS_ESCAPE_MAP[match] }
      javascript.html_safe? ? result.html_safe : result
    else
      ''
    end
  end

  def schedules_for_form(event)
    IceCube::Schedule.from_hash(event.schedule).recurrence_rules unless event.schedule.nil?
  end

  alias_method :jh, :escape_javascript_with_inside_html

end

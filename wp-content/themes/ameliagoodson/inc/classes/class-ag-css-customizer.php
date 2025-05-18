<?php
class AG_Customizer_CSS
{
  public static function get_background_position_css($selector, $setting_name, $default_position = 'center center')
  {
    $css = '';
    $position = get_theme_mod($setting_name, $default_position);

    switch ($position) {
      case 'left top':
      case 'center top':
      case 'right top':
      case 'left center':
      case 'center center':
      case 'right center':
      case 'left bottom':
      case 'center bottom':
      case 'right bottom':
        $css .= '.' . $selector . ' { background-position: ' . $position . '; }';
        break;
      default:
        $css .= '.' . $selector . ' { background-position: ' . $default_position . '; }';
        break;
    }

    return $css;
  }

  public static function get_customizer_css()
  {
    $css = '';
    $transparent_header = get_theme_mod('hero_transparent_header');

    if ($transparent_header) {
      $css .= self::get_background_position_css('background-image', 'hero_bg_image_position');
      $css .= '.hero {background-image: none !important}';
    } else {
      $css .= self::get_background_position_css('hero', 'hero_bg_image_position');
    }
    return $css;
  }
}

<?php

/**
 * Displays the entry header on single projects
 *
 */

?>
<?php

$project = get_field('project');
$project_image = $project['project_image'] ?? null;
$project_type = $project['project_type'] ?? '';
$project_company = $project['project_company'] ?? '';
$project_company_link = $project['project_link_company'] ?? null;
$project_role = $project['project_role'] ?? '';
$tech_stack = $project['project_tech_stack'] ?? '';
$features = $project['project_features'] ?? '';
$duration = $project['project_duration'] ?? '';
$live_link = $project['project_link_live'] ?? null;
?>

<!-- Entry header project -->
<div class="entry-header">
  <div class="section-inner mw-medium">

    <?php
    // Home = blog homepage
    // Hide the page title on the actual front page
    if (is_home()) : ?>
      <div class="entry-title h1"><?php the_title(); ?></div>

    <?php elseif (!is_front_page()) : ?>
      <h1 class="entry-title h1"><?php the_title(); ?></h1>
    <?php endif; ?>
    <?php if (has_excerpt()) : ?>
      <div class="intro-text contain-margins">
        <?php the_excerpt(); ?>
      </div>
    <?php endif; ?>
  </div>
  <div class="project-snapshot section-inner mw-medium ">
    <table class="project-snapshot__table">
      <tbody>
        <?php if ($project_type) : ?>
          <tr>
            <th>Project Type</th>
            <td>
              <?php
              echo esc_html($project_type);
              if ($project_company && $project_company_link) {
                echo ' (via <a href="' . esc_url($project_company_link['url']) . '" target="' . esc_attr($project_company_link['target'] ?: '_self') . '">' . esc_html($project_company) . '</a>)';
              } elseif ($project_company) {
                echo ' (via ' . esc_html($project_company) . ')';
              }
              ?>
            </td>
          </tr>
        <?php endif; ?>

        <?php if ($project_role) : ?>
          <tr>
            <th>My Role</th>
            <td><?php echo esc_html($project_role); ?></td>
          </tr>
        <?php endif; ?>

        <?php if ($tech_stack) : ?>
          <tr>
            <th>Tech Stack</th>
            <td><?php echo esc_html($tech_stack); ?></td>
          </tr>
        <?php endif; ?>

        <?php if ($features) : ?>
          <tr>
            <th>Key Features</th>
            <td><?php echo esc_html($features); ?></td>
          </tr>
        <?php endif; ?>

        <?php if ($duration) : ?>
          <tr>
            <th>Duration</th>
            <td><?php echo esc_html($duration); ?></td>
          </tr>
        <?php endif; ?>

        <?php if ($live_link) : ?>
          <tr>
            <th>Live Link</th>
            <td>
              <a href="<?php echo esc_url($live_link['url']); ?>" target="<?php echo esc_attr($live_link['target'] ?: '_self'); ?>">
                <?php echo esc_html($live_link['title'] ?: 'View Site'); ?>
              </a>
            </td>
          </tr>
        <?php endif; ?>
      </tbody>
    </table>
  </div>
  <?php if ($project_image || has_post_thumbnail()) : ?>
    <figure class="featured-media section-inner mw-medium reveal">
      <div class="media-wrapper">
        <?php if ($project_image) : ?>
          <img src="<?php echo esc_url($project_image['url']); ?>" alt="<?php echo esc_attr($project_image['alt']); ?>" />
        <?php else : ?>
          <?php the_post_thumbnail(); ?>
        <?php endif; ?>
      </div>
    </figure>
  <?php endif; ?>



</div>
<!-- End Entry header project -->
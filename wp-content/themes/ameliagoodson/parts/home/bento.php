<?php
$projects = get_posts(array(
  "post_type" => "project",
  "posts_per_page" => 6, // Fetch all posts
  "orderby" => "menu_order",
));

$work_text = get_field('work_text');
?>

<section id="work">
  <div class="section-inner mw-large">
    <div class="section-intro">
      <h2 class="section-title">Work</h2>
      <?php
      if ($work_text) : ?>
        <p><?php echo $work_text ?></p>
      <?php endif ?>
    </div>
    <div class="grid bento-grid">
      <?php foreach ($projects as $index => $project) : ?>
        <?php
        // Fetch the group field
        $project_group = get_field('project', $project->ID); // Fetch the "work" group

        // Get the permalink for this project
        $project_permalink = get_permalink($project->ID);

        // Check if the group field has data
        if ($project_group) {
          $project_title = $project_group['project_title'] ?: '';
          $project_subtitle = $project_group['project_subtitle'] ?: '';
          $project_description = get_the_excerpt($project->ID);
          $project_image = get_the_post_thumbnail($project->ID, 'full');
          $project_video = $project_group['project_video'] ?: [];
          $cta_button = $project_group['cta_button'];
          $project_layout = $project_group['project_layout'] ?: '';
          $project_image_layout = $project_group['project_image_layout'];
        }
        ?>
        <?php if (array_filter($projects)) : ?>
          <div class="reveal grid-item bento-card grid-item0<?= $index + 1 ?>  <?php echo $project_layout ?> <?php echo $project_image_layout ?>">
            <div class="bento-details">
              <?php if ($project_title) : ?>
                <a class="bento-link" href="<?php echo esc_url($project_permalink)  ?>">
                  <h3 class="bento-title"><?php echo $project_title ?></h3>
                </a>
              <?php endif ?>
              <?php if ($project_subtitle) : ?>
                <p class="bento-subtitle"><?php echo $project_subtitle ?></p>
              <? endif ?>
              <?php
              if ($project_description) : ?>
                <p class="bento-description"><?php echo $project_description ?></p>
              <?php endif ?>
              <?php
              if ($project_permalink && $cta_button) : ?>
                <div class="btn-container mt-sm">
                  <a class="btn bento-button" href="<?php echo esc_url($project_permalink) ?>">See More</a>
                </div>
              <?php endif ?>
            </div>

            <div class="bento-image">
              <?php if ($project_video) : ?>
                <video controls poster>
                  <source src="" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
              <?php else : ?>
                <a href="<?php echo $project_permalink ?>">
                  <?php echo $project_image; ?>
                </a>
              <?php endif; ?>
            </div>
          </div>
        <?php endif; ?>


      <?php endforeach; ?>
    </div>
  </div>
</section>
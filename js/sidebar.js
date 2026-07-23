document.addEventListener('DOMContentLoaded', function () {
  var sidebar = document.querySelector('nav.sidebar');
  if (!sidebar) return;

  // Every <section> in <main> except the hero becomes a toggle-able panel.
  var sections = Array.prototype.filter.call(
    document.querySelectorAll('main > section'),
    function (s) { return s.id !== 'hero'; }
  );
  sections.forEach(function (s) { s.classList.add('content-section'); });

  var navLinks = Array.prototype.slice.call(sidebar.querySelectorAll('a[href^="#"]'));

  // Any other on-page link that points at a section (e.g. the "Contact"
  // button in the hero) should also be able to jump to that section.
  var otherSectionLinks = Array.prototype.filter.call(
    document.querySelectorAll('a[href^="#"]'),
    function (a) { return !sidebar.contains(a); }
  );

  function sectionIdFromLink(link) {
    var id = link.getAttribute('href').slice(1);
    var el = document.getElementById(id);
    return (el && el.classList.contains('content-section')) ? id : null;
  }

  function showSection(id) {
    sections.forEach(function (s) {
      s.classList.toggle('active', s.id === id);
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('active', sectionIdFromLink(a) === id);
    });
  }

  // Decide the starting section: use the URL hash if it matches a section,
  // otherwise default to "about".
  var startId = (location.hash || '').slice(1);
  if (!document.getElementById(startId) || !document.getElementById(startId).classList.contains('content-section')) {
    var firstSection = sections[0];
    startId = firstSection ? firstSection.id : null;
  }

  var activeId = startId;
  if (activeId) showSection(activeId);

  navLinks.forEach(function (link) {
    var id = sectionIdFromLink(link);
    if (!id) return;

    // Hover previews the section.
    link.addEventListener('mouseenter', function () {
      showSection(id);
    });

    // Click pins it as the current section.
    link.addEventListener('click', function () {
      activeId = id;
      showSection(id);
    });
  });

  // Leaving the sidebar without clicking reverts to the last pinned section.
  sidebar.addEventListener('mouseleave', function () {
    if (activeId) showSection(activeId);
  });

  // Links outside the sidebar (e.g. hero "Contact" button) just jump + pin.
  otherSectionLinks.forEach(function (link) {
    var id = sectionIdFromLink(link);
    if (!id) return;
    link.addEventListener('click', function () {
      activeId = id;
      showSection(id);
    });
  });
});

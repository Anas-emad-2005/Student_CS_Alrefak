// Course data with prerequisites
const coursesData = [
   
    { id: 'islamic-culture', name: 'ثقافة إسلامية', credits: 2, prerequisites: [], semester: 1 },
    { id: 'political-science', name: 'مبادئ العلوم السياسية', credits: 2, prerequisites: [], semester: 1 },
    { id: 'arabic-language', name: 'اللغة العربية', credits: 2, prerequisites: [], semester: 1 },
    { id: 'english-1', name: 'اللغة الانجليزية 1', credits: 2, prerequisites: [], semester: 1 },
    { id: 'math-1', name: 'رياضة 1', credits: 3, prerequisites: [], semester: 1 },
    { id: 'computer-basics', name: 'مقدمة في علوم الحاسوب', credits: 3, prerequisites: [], semester: 1 },
    { id: 'electrical-engineering', name: 'مبادئ هندسة كهربائية', credits: 3, prerequisites: [], semester: 1 },
    { id: 'programming-basics', name: 'اساسيات برمجة', credits: 4, prerequisites: [], semester: 1 },


    { id: 'english-2', name: 'لغة انجليزية 2', credits: 2, prerequisites: ['english-1'], semester: 2 },
    { id: 'math-2', name: 'رياضة 2', credits: 3, prerequisites: ['math-1'], semester: 2 },
    { id: 'statistics', name: 'إحصاء واحتمالات', credits: 3, prerequisites: ['math-1'], semester: 2 },
    { id: 'digital-systems', name: 'مقدمة أنظمة رقمية', credits: 4, prerequisites: ['electrical-engineering', 'computer-basics'], semester: 2 },
   
    { id: 'systems-analysis', name: 'تحليل نظم', credits: 4, prerequisites: ['programming-basics' , 'c-language'], semester: 3 },
    { id: 'c-language', name: 'لغة C', credits: 4, prerequisites: ['programming-basics'], semester: 2 },


   { id: 'visual-programming-1', name: 'برمجة مرئية1 ', credits: 4, prerequisites: ['c-language'], semester: 3 },
   { id: 'cpp-programming', name: 'البرمجة الشيئية  ', credits: 4, prerequisites: ['c-language'], semester: 3 },
   { id: 'data-structures-1', name: 'تراكيب بيانات 1', credits: 4, prerequisites: ['c-language'], semester: 3 },
   { id: 'database-management', name: 'إدارة قواعد بيانات', credits: 4, prerequisites: ['systems-analysis','discrete-structures'], semester: 4 },
   { id: 'software-engineering', name: 'هندسة برمجيات', credits: 4, prerequisites: ['systems-analysis'], semester: 4 },
   { id: 'numerical-methods', name: 'طرق عددية', credits: 4, prerequisites: ['math-2','c-language'], semester: 4 },
   { id: 'discrete-structures', name: 'تراكيب منفصلة', credits: 3, prerequisites: ['math-2'], semester: 3 },
   { id: 'linear-algebra', name: 'جبر خطي والمنطق', credits: 3, prerequisites: ['math-2'], semester: 3 },
   { id: 'computer-organization', name: 'تنظيم حاسبات', credits: 4, prerequisites: ['digital-systems'], semester: 3 },
   


    
    { id: 'operating-systems', name: 'نظم تشغيل', credits: 4, prerequisites: ['software-engineering','data-structures-1'], semester: 2 },
    { id: 'delphi', name: 'لغة دلفي', credits: 4, prerequisites: ['database-management'], semester: 3 },
    { id: 'visual-programming-2', name: 'برمجة مرئية2 ', credits: 4, prerequisites: ['visual-programming-1'], semester: 5},
    { id: 'data-structures-2', name: 'تراكيب بيانات 2', credits: 4, prerequisites: ['data-structures-1','cpp-programming'], semester: 5 },
    { id: 'java-language', name: 'لغة جافا', credits: 4, prerequisites: ['cpp-programming'], semester: 3 },
    

    { id: 'assembly-language', name: 'لغة تجميع ASSEMBLY', credits: 4, prerequisites: ['computer-organization'], semester: 4 },
    { id: 'computer-networks', name: 'شبكات حاسوب', credits: 4, prerequisites: ['assembly-language'], semester: 5 },
    { id: 'computer-architecture', name: 'معمارية الحاسوب', credits: 4, prerequisites: ['assembly-language'], semester: 5 }, 

    { id: 'web-design', name: 'تصميم مواقع انترنت', credits: 3, prerequisites: ['java-language','visual-programming-2'], semester: 7 },
    { id: 'modeling-simulation', name: 'النمذجة والمحاكاة', credits: 4, prerequisites: ['visual-programming-2'], semester: 6 },
    { id: 'artificial-intelligence', name: 'ذكاء اصطناعي', credits: 4, prerequisites: ['data-structures-2'], semester: 7 },
    { id: 'Mobile applications', name: '(إختيارية)تطبيقات موبايل', credits: 4, prerequisites: ['java-language'], semester: 5 },
   
    
    
  
    { id: 'systems-programming', name: 'برمجة نظم', credits: 4, prerequisites: ['computer-architecture'], semester: 6},
    { id: 'computer-graphics', name: 'الرسم بالحاسوب', credits: 4, prerequisites: ['modeling-simulation'], semester: 7 },
    { id: 'selected-topics-2', name: ' (إختيارية)معالجة الصور', credits: 4, prerequisites: ['modeling-simulation'], semester: 7 },
    { id: 'Information security', name: '(إختيارية) أمن المعلومات', credits: 4, prerequisites: ['computer-networks'], semester: 6 },
    { id: 'Network building and design', name: '(إختيارية) بناء وتصميم الشبكات', credits: 4, prerequisites: ['computer-networks'], semester: 6 },
    
   

    { id: 'research-methods', name: 'مناهج البحث والتدريب الميداني', credits: 2, prerequisites: [], semester: 4, requiresCredits: 130 },
    { id: 'graduation-project', name: 'مشروع التخرج', credits: 4, prerequisites: [], semester: 4, requiresCredits: 130 }
];

// State management
let completedCourses = new Set();
let totalCredits = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadCompletedCourses();
    renderCourses();
    updateSummary();
    updateAllowedCourses();
});

// Load completed courses from localStorage
function loadCompletedCourses() {
    const saved = localStorage.getItem('completedCourses');
    if (saved) {
        completedCourses = new Set();
    }
}

// Save completed courses to localStorage

function saveCompletedCourses() {
   // localStorage.setItem('completedCourses', JSON.stringify([...completedCourses]));
}

// Render all courses
function renderCourses() {
    const coursesGrid = document.getElementById('courses-grid');
    coursesGrid.innerHTML = '';

    coursesData.forEach(course => {
        const button = createCourseButton(course);
        coursesGrid.appendChild(button);
    });
}



// Create a course button
function createCourseButton(course) {
    const button = document.createElement('button');
    button.className = 'course-btn';
    button.textContent = course.name;
    button.dataset.courseId = course.id;

    // Set initial state
    if (completedCourses.has(course.id)) {
        button.classList.add('completed');
    } else if (isCourseAllowed(course)) {
        button.classList.add('allowed');
    } else {
        button.classList.add('blocked');
        button.disabled = true;
    }

    // Add click event listener
    button.addEventListener('click', function() {
        toggleCourse(course.id);
    });

    return button;
}

// Toggle course completion status
function toggleCourse(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;

    const isOptional = course.name.includes('إختيارية');

    // تحقق من عدد المواد الاختيارية
    if (isOptional && !completedCourses.has(courseId)) {
        const optionalCount = [...completedCourses].filter(id => {
            const c = coursesData.find(x => x.id === id);
            return c && c.name.includes('إختيارية');
        }).length;

        if (optionalCount >= 2) {
            showNotification('لا يمكنك اختيار أكثر من مادتين اختياريتين', 'error');
            return;
        }
    }

    // لو المادة محددة ونبي نشيلها
    if (completedCourses.has(courseId)) {
        completedCourses.delete(courseId);

        // نحذف أي مادة تعتمد عليها
        coursesData.forEach(c => {
            if (c.prerequisites.includes(courseId) && completedCourses.has(c.id)) {
                completedCourses.delete(c.id);
                showNotification(`تم إلغاء ${c.name} لأنها تعتمد على ${course.name}`, 'info');
            }
        });

        showNotification(`تم إلغاء تحديد مادة: ${course.name}`, 'info');
    } else {
        // نضيف المادة
        completedCourses.add(courseId);
        showNotification(`تم تحديد مادة: ${course.name} كمكتملة`, 'success');
    }

    // حفظ وتحديث
    saveCompletedCourses();
    renderCourses();
    updateSummary();
    updateAllowedCourses();
}


// Check if a course is allowed to be taken
function isCourseAllowed(course) {
    // Check prerequisites
    for (let prereq of course.prerequisites) {
        if (!completedCourses.has(prereq)) {
            return false;
        }
    }

    // Check credit requirements
    if (course.requiresCredits) {
        const currentCredits = calculateTotalCredits();
        if (currentCredits < course.requiresCredits) {
            return false;
        }
    }

    return true;
}

// Calculate total credits earned
function calculateTotalCredits() {
    let total = 0;
    completedCourses.forEach(courseId => {
        const course = coursesData.find(c => c.id === courseId);
        if (course) {
            total += course.credits;
        }
    });
    return total;
}

// Update summary statistics
function updateSummary() {
    const totalCoursesElement = document.getElementById('total-courses');
    const completedCoursesElement = document.getElementById('completed-courses');
    const remainingCoursesElement = document.getElementById('remaining-courses');

    const totalCourses = 40;
    const completedCount = completedCourses.size;
    const remainingCoursesCount = completedCount >= 40 ? 0 : totalCourses - completedCount;

    const totalUnits = 140;
    let completedUnits = calculateTotalCredits();
    let remainingUnits = 0;

    // لو الطالب كمل 40 مادة، اعتبره كمل 140 وحدة
    if (completedCount >= 40) {
        completedUnits = 140;
        remainingUnits = 0;
    } else {
        remainingUnits = totalUnits - completedUnits;
    }

    totalCoursesElement.textContent = totalCourses;
    completedCoursesElement.textContent = completedCount;
    remainingCoursesElement.textContent = remainingCoursesCount;

    document.getElementById('earned-credits').textContent = completedUnits;
    document.getElementById('remaining-credits').textContent = remainingUnits;

    // Animation effect
    [totalCoursesElement, completedCoursesElement, remainingCoursesElement].forEach(el => {
        el.style.transform = 'scale(1.1)';
        setTimeout(() => {
            el.style.transform = 'scale(1)';
        }, 200);
    });
}
    const totalUnits = 142;
const completedUnits = calculateTotalCredits();
const remainingUnits = totalUnits - completedUnits;

// نعرض القيم في الصفحة
document.getElementById('earned-credits').textContent = completedUnits;
document.getElementById('remaining-credits').textContent = remainingUnits;


// Update allowed courses list
function updateAllowedCourses() {
    const allowedCoursesList = document.getElementById('allowed-courses-list');
    allowedCoursesList.innerHTML = '';

    // احسب عدد المواد الاختيارية المحددة
    const optionalSelectedCount = [...completedCourses].filter(id => {
        const c = coursesData.find(x => x.id === id);
        return c && c.name.includes('إختيارية');
    }).length;

    const allowedCourses = coursesData.filter(course => {
        if (completedCourses.has(course.id)) return false;
        if (!isCourseAllowed(course)) return false;

        // إذا كانت المادة اختيارية وتم اختيار 2، لا تظهرها في القائمة
        if (course.name.includes('إختيارية') && optionalSelectedCount >= 2) return false;

        return true;
    });

    if (allowedCourses.length === 0) {
        allowedCoursesList.innerHTML = '<p style="text-align: center; color: #666;">لا توجد مواد متاحة حالياً</p>';
        return;
    }

    allowedCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = 'allowed-course';
        courseElement.textContent = course.name;
        allowedCoursesList.appendChild(courseElement);
    });
}


// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(145deg, #4CAF50, #45a049)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(145deg, #f44336, #d32f2f)';
            break;
        case 'info':
        default:
            notification.style.background = 'linear-gradient(145deg, #2196F3, #1976D2)';
            break;
    }

    // Add to document
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Ctrl + R to reset all courses
    if (event.ctrlKey && event.key === 'r') {
        event.preventDefault();
        if (confirm('هل أنت متأكد من أنك تريد إعادة تعيين جميع المواد؟')) {
            resetAllCourses();
        }
    }
    
    // Ctrl + S to save (already auto-saved, but show confirmation)
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        showNotification('تم حفظ التقدم تلقائياً', 'success');
    }
});

// Reset all courses

function resetAllCourses() {
    completedCourses.clear();
    saveCompletedCourses();
    renderCourses();
    updateSummary();
    updateAllowedCourses();
    showNotification('تم إعادة تعيين جميع المواد', 'info');
}

// Add export functionality
function exportProgress() {
    const data = {
        studentName: 'أنس عماد عبد الله',
        completedCourses: [...completedCourses],
        totalCredits: calculateTotalCredits(),
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'academic_progress.json';
    link.click();
    
    showNotification('تم تصدير التقدم الأكاديمي', 'success');
}

// Add import functionality

function importProgress(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.completedCourses && Array.isArray(data.completedCourses)) {
                completedCourses = new Set(data.completedCourses);
                saveCompletedCourses();
                renderCourses();
                updateSummary();
                updateAllowedCourses();
                showNotification('تم استيراد التقدم الأكاديمي بنجاح', 'success');
            }
        } catch (error) {
            showNotification('خطأ في استيراد الملف', 'error');
        }
    };
    reader.readAsText(file);
}

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

// Initialize tooltips for better user experience
function initializeTooltips() {
    const courseButtons = document.querySelectorAll('.course-btn');
    courseButtons.forEach(button => {
        const courseId = button.dataset.courseId;
        const course = coursesData.find(c => c.id === courseId);
        
        if (course) {
            button.title = `المادة: ${course.name}\nالوحدات: ${course.credits}\nالفصل الدراسي ${course.semester}`;
            
            if (course.prerequisites.length > 0) {
                const prereqNames = course.prerequisites.map(id => {
                    const prereqCourse = coursesData.find(c => c.id === id);
                    return prereqCourse ? prereqCourse.name : id;
                }).join(', ');
                button.title += `\nالمتطلبات السابقة: ${prereqNames}`;
            }
            
            if (course.requiresCredits) {
                button.title += `\nيتطلب ${course.requiresCredits} وحدة`;
            }
        }
    });
}

// Call initialize tooltips after rendering courses
const originalRenderCourses = renderCourses;
renderCourses = function() {
    originalRenderCourses();
    setTimeout(initializeTooltips, 100);
};

document.getElementById('show-tree-btn').addEventListener('click', function () {
    document.getElementById('course-tree-modal').style.display = 'flex';
});

document.getElementById('close-tree-modal').addEventListener('click', function () {
    document.getElementById('course-tree-modal').style.display = 'none';
});

// لو المستخدم ضغط برة الصورة
document.getElementById('course-tree-modal').addEventListener('click', function (e) {
    if (e.target.id === 'course-tree-modal') {
        document.getElementById('course-tree-modal').style.display = 'none';
    }
});